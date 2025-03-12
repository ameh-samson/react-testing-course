import { useState } from "react";

export type ItemCategory = "urgent" | "normal" | "low";

export type Item = {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
};

export type ItemWithoutID = Omit<Item, "id">;

export const useFlowManager = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (newItem: ItemWithoutID) => {
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
  };
  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };
  return { items, handleAddItem, handleDelete };
};
