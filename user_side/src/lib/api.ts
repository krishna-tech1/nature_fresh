export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  images: string[];
  status: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function submitQuote(data: {
  name: string;
  company: string;
  email: string;
  quantity: string;
  productId: number;
  productName: string;
}): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return { success: res.ok };
  } catch (error) {
    console.error('Error submitting quote:', error);
    return { success: false };
  }
}
