'use client';

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@/lib/api/productsApi';
import { useGetCategoriesQuery } from '@/lib/api/categoryApi';

import { Category, ProductType } from '@/types/productType';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import Image from 'next/image';
import { ArrowUpDown } from 'lucide-react';

export function ProductTable() {
  const { data = [], isLoading, isError } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [form, setForm] = useState({
    title: '',
    price: '',
    file: null as File | null,
    previewUrl: '',
    imageUrl: '',
    categoryId: '',
  });

  const [editing, setEditing] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleEdit = (product: ProductType) => {
    setForm({
      title: product.title,
      price: product.price.toString(),
      file: null,
      previewUrl: product.images?.[0] || '',
      imageUrl: product.images?.[0] || '',
      categoryId: product.category?.id.toString() ?? '',
    });
    setEditing(product.id);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setForm({ title: '', price: '', file: null, previewUrl: '', imageUrl: '', categoryId: '' });
    setEditing(null);
    setIsDialogOpen(true);
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Replace with real upload logic (e.g., Firebase/S3/api)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file)); // Simulate upload with preview URL
      }, 500);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = form.imageUrl;
      if (form.file) {
        imageUrl = await uploadImage(form.file);
      }

      const productPayload = {
        title: form.title,
        price: parseFloat(form.price),
        description: 'Default description',
        categoryId: parseInt(form.categoryId),
        images: [imageUrl],
      };

      if (editing) {
        await updateProduct({ id: editing, data: productPayload });
      } else {
        await createProduct(productPayload);
      }

      // Reset form
      setForm({ title: '', price: '', file: null, previewUrl: '', imageUrl: '', categoryId: '' });
      setEditing(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await deleteProduct(id);
    }
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    { accessorKey: 'title', header: 'Title' },
    {
      accessorKey: 'images[0]',
      header: 'Image',
      cell: ({ row }) => (
        <Image
          src={row.original.images?.[0] || ''}
          alt={row.original.title}
          unoptimized
          width={64}
          height={64}
          className="object-cover rounded-md"
        />
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <span>${row.getValue('price')}</span>,
    },
    {
      accessorKey: 'category.name',
      header: 'Category',
      cell: ({ row }) => <span>{row.original.category?.name ?? 'N/A'}</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(row.original)} size="sm" variant="outline">
            Edit
          </Button>
          <Button onClick={() => handleDelete(row.original.id)} size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-center p-4 text-red-500">Error loading products.</div>;

  return (
    <section className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-400" variant="default">
              Add New Product
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow mb-6">
              <AlertDialogHeader>
                <AlertDialogTitle>{editing ? 'Edit Product' : 'Add New Product'}</AlertDialogTitle>

                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border px-3 py-2"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-full border px-3 py-2"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />

                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full border px-3 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: Category) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border px-3 py-2"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setForm({
                        ...form,
                        file,
                        previewUrl: URL.createObjectURL(file),
                      });
                    }
                  }}
                />

                {form.previewUrl && (
                  <Image
                    src={form.previewUrl}
                    alt="Preview"
                    width={80}
                    height={80}
                    unoptimized
                    className="rounded-md object-cover"
                  />
                )}
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editing ? 'Update Product' : 'Create Product'}
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {data.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
