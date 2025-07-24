"use client";

import { Button } from "@/components/ui/button";
import ProductTable from "./DataTable";
import { columns } from "./columns";
import { useGetProductsQuery } from "@/lib/api/productsApi";
import { useState } from "react";
import { ProductFormDialog } from "./form-dialog";

export default function ProductDashboardPage() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Product Dashboard</h1>
        <Button onClick={() => setOpenDialog(true)}>Add Product</Button>
      </div>

      {error && <p className="text-red-500">Failed to load products</p>}

      {!isLoading && data && (
        <ProductTable columns={columns} data={data.products} />
      )}

      <ProductFormDialog open={openDialog} onOpenChange={setOpenDialog} />
    </main>
  );
}
