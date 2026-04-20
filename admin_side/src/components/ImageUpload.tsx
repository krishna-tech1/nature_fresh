"use client";

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  limit?: number;
}

export default function ImageUpload({ value = [], onChange, label, limit = 3 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (value.length >= limit) {
      alert(`Maximum ${limit} images allowed`);
      return;
    }

    setUploading(true);
    
    // Upload files one by one (simplified for now)
    const newUrls = [...value];
    const uploadLimit = Math.min(files.length, limit - value.length);

    try {
      for (let i = 0; i < uploadLimit; i++) {
        const formData = new FormData();
        formData.append('image', files[i]);
        
        const res = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          newUrls.push(data.url);
        }
      }
      onChange(newUrls);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Some uploads failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  return (
    <div className="upload-container" style={{ marginBottom: '24px' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
          </label>
          <span style={{ fontSize: '11px', fontWeight: 700, color: value.length >= limit ? '#ef4444' : '#0ea5e9' }}>
            {value.length} / {limit} Images
          </span>
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}>
        {value.map((url, index) => (
          <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <img src={url} alt={`Upload ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button 
              type="button"
              onClick={() => removeImage(index)}
              style={{ 
                position: 'absolute', 
                top: '8px', 
                right: '8px', 
                background: 'rgba(239, 68, 68, 0.9)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                width: '28px', 
                height: '28px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <X size={16} />
            </button>
            {index === 0 && (
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'rgba(14, 165, 233, 0.9)', color: 'white', fontSize: '10px', fontWeight: 800, textAlign: 'center', padding: '4px', textTransform: 'uppercase' }}>
                Main Image
              </div>
            )}
          </div>
        ))}

        {value.length < limit && (
          <div 
            onClick={() => !uploading && document.getElementById('file-upload')?.click()}
            style={{ 
              aspectRatio: '1',
              border: '2px dashed #e2e8f0', 
              borderRadius: '16px', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: uploading ? 'default' : 'pointer',
              background: '#f8fafc',
              transition: 'all 0.2s',
              color: '#64748b'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#0ea5e9'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            {uploading ? (
              <Loader2 className="animate-spin" size={24} color="#0ea5e9" />
            ) : (
              <>
                <Upload size={24} style={{ marginBottom: '8px' }} />
                <span style={{ fontSize: '11px', fontWeight: 700 }}>Add Image</span>
              </>
            )}
          </div>
        )}
      </div>

      <input 
        id="file-upload"
        type="file" 
        style={{ display: 'none' }} 
        onChange={handleUpload} 
        accept="image/*"
        multiple={limit - value.length > 1}
      />
      
      <p style={{ marginTop: '12px', fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>
        Upload up to {limit} high-quality images. The first image will be used as the primary display.
      </p>
    </div>
  );
}
