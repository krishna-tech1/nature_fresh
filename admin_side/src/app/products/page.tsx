"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Package, 
  Plus, 
  Filter, 
  Download, 
  Edit2, 
  Trash2, 
  X,
  Loader2,
  Tag,
  Box,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronRight,
  Search
} from 'lucide-react';
import styles from './Products.module.css';
import { API_BASE_URL } from '@/lib/api';
import ImageUpload from '@/components/ImageUpload';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  images: string[];
  status: string;
  createdAt: string;
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState('All Items');
  const searchParams = useSearchParams();
  const globalSearchQuery = (searchParams.get('q') || '').toLowerCase();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Fish',
    images: [] as string[],
    status: 'In Stock'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(globalSearchQuery) || 
                         p.description.toLowerCase().includes(globalSearchQuery);
    const matchesCategory = activeFilter === 'All Items' || p.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProduct ? `${API_BASE_URL}/products/${editingProduct.id}` : `${API_BASE_URL}/products`;
    const method = editingProduct ? 'PUT' : 'POST';
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchProducts();
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ name: '', description: '', category: 'Fish', images: [], status: 'In Stock' });
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      images: product.images || [],
      status: product.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const categories = ['All Items', 'Fish', 'Shrimp', 'Salmon', 'Cephalopods', 'Crab & Lobster', 'Tuna'];

  return (
    <>
      <div className={`${styles.container} animate-fade-in`}>
        <div className={styles.header}>
        <div>
          <p className={styles.subtitle}>INVENTORY MANAGEMENT</p>
          <h1 className={styles.title}>Product Catalog</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.primaryButton} onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', description: '', category: 'Fish', images: [], status: 'In Stock' });
            setShowModal(true);
          }}>
            <Plus size={18} />
            New Product
          </button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.categoryFilters}>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`${styles.filterChip} ${activeFilter === cat ? styles.activeChip : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date Added</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '100px 0' }}>
                    <Loader2 className="animate-spin" size={32} color="#0ea5e9" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '100px 0' }}>
                    <AlertCircle size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                    <p style={{ color: '#64748b', fontWeight: 600 }}>No products found matching your search</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.productImage}>
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} />
                          ) : (
                            <Package size={20} color="#94a3b8" />
                          )}
                        </div>
                        <div className={styles.productInfo}>
                          <p className={styles.productName}>{product.name}</p>
                          <p className={styles.productDesc}>{product.description.substring(0, 40)}...</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{product.category}</span>
                    </td>
                    <td>
                      <div className={`${styles.statusBadge} ${product.status === 'In Stock' ? styles.statusInStock : styles.statusOutOfStock}`}>
                        <div className={styles.statusDot} />
                        {product.status}
                      </div>
                    </td>
                    <td>
                      <p className={styles.dateText}>{new Date(product.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className={styles.actionButtons}>
                        <button className={styles.editBtn} onClick={() => handleEdit(product)}>
                          <Edit2 size={16} />
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {showModal && (
      <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <p className={styles.modalSubtitle}>Fill in the details below to update your catalog</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className={styles.label}>Product Name</label>
                    <span className={styles.charCount}>{formData.name.length} / 50</span>
                  </div>
                  <input 
                    type="text" 
                    required 
                    maxLength={50}
                    className={styles.input}
                    placeholder="e.g. Yellowfin Tuna"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select 
                    className={styles.select}
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Fish">Fish</option>
                    <option value="Shrimp">Shrimp</option>
                    <option value="Salmon">Salmon</option>
                    <option value="Cephalopods">Cephalopods</option>
                    <option value="Crab & Lobster">Crab & Lobster</option>
                    <option value="Tuna">Tuna</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className={styles.label}>Description</label>
                  <span className={styles.charCount}>{formData.description.length} / 500</span>
                </div>
                <textarea 
                  required 
                  maxLength={500}
                  className={styles.textarea}
                  placeholder="Describe the product quality, origin, and specifications..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Status</label>
                  <div className={styles.radioGroup}>
                    <label className={`${styles.radioLabel} ${formData.status === 'In Stock' ? styles.radioActive : ''}`}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="In Stock"
                        checked={formData.status === 'In Stock'}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                      />
                      In Stock
                    </label>
                    <label className={`${styles.radioLabel} ${formData.status === 'Out of Stock' ? styles.radioActive : ''}`}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="Out of Stock"
                        checked={formData.status === 'Out of Stock'}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                      />
                      Out of Stock
                    </label>
                  </div>
                </div>
              </div>

              <ImageUpload 
                label="Product Images (Max 3)" 
                value={formData.images} 
                onChange={urls => setFormData({ ...formData, images: urls })}
                limit={3}
              />

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container" style={{display:'flex', justifyContent:'center', padding:'100px'}}><Loader2 className="animate-spin" size={48} color="#0ea5e9" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
