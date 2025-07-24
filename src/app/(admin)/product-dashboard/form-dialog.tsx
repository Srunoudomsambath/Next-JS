"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductMutation } from "@/lib/api/productsApi";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(1),
  price: z.string(),
  category: z.string(),
});

type FormData = z.infer<typeof schema>;

export function ProductFormDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [createProduct] = useCreateProductMutation();

  const onSubmit = async (values: FormData) => {
    try {
      await createProduct({ ...values, price: Number(values.price) });
      toast.success("Product created!");
      reset();
      onOpenChange(false);
    } catch {
      toast.error("Failed to create product.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Title" {...register("title")} />
          <Input placeholder="Price" type="number" {...register("price")} />
          <Input placeholder="Category" {...register("category")} />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
