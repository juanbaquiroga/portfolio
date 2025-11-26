'use client';

import React, { useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './ImageUploader.module.scss'; // Asegúrate que el path es correcto

// 1. Nueva interfaz para la previsualización, ahora más genérica
interface PreviewItem {
  id: string;
  url: string;
  file?: File; // El objeto File real (opcional si es solo una URL guardada)
}

interface ImageUploaderProps {
  label: string;
  previewItems: PreviewItem[];
  onRemoveItem: (index: number) => void; 
  mode?: 'single' | 'multiple'; 
  
  // ⬅️ ¡CLAVE! Nuevo prop para manejar la selección de archivos
  onFilesSelect: (files: FileList | null) => void;
  
  // ⬅️ CLAVE: El register es opcional, solo para la validación inicial del esquema Zod.
  register?: UseFormRegisterReturn; 
  id: string;
  error?: string; 
  maxFiles?: number;
}


export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  previewItems,
  onRemoveItem,
  mode = 'single', // Valor por defecto 'single' (Portada)
  onFilesSelect, // Nuevo prop
  register, // Ahora opcional
  id,
  error,
  maxFiles = 1,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Condición para deshabilitar la subida si ya se alcanzó el máximo en modo 'multiple'
  const isDisabled = mode === 'multiple' && previewItems.length >= maxFiles;
  
  // Función para abrir el selector de archivos
  const handleButtonClick = () => {
    if (!isDisabled) {
        fileInputRef.current?.click();
    }
  };
  
  // ⬅️ CLAVE: Manejador local que dispara el prop onFilesSelect
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilesSelect(e.target.files);
      // Esto es crucial: resetea el input para permitir seleccionar más archivos.
      e.target.value = ''; 
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {/* 5. Secciones de control y error */}
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.control}>  
        {/* Botón de Subida */}
        <button 
          type="button" 
          className={`${styles.uploadButton} ${isDisabled ? styles.disabled : ''}`} 
          onClick={handleButtonClick}
          disabled={isDisabled}
        >
          {isDisabled ? `Máximo de ${maxFiles} alcanzado` : '➕ Select Image(s)'}
        </button>
        {/* Input de archivo real (oculto) */}
        <input
          // El 'name' del registro se debe pasar al input para que Zod sepa a qué campo corresponde
          {...register} 
          ref={(e) => {
            if (register) register.ref(e); // Si pasamos register, lo mantenemos para validación
            (fileInputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
          }}
          type="file"
          id={id}
          className={styles.hiddenFileInput}
          multiple={mode === 'multiple'} 
          disabled={isDisabled}
          
          // ⬅️ CLAVE: Capturamos el evento aquí y lo pasamos al componente padre
          onChange={handleFileChange} 
        />
        
        {/* 8. Contenedor de Previsualizaciones (funciona para single o multiple) */}
        {previewItems.length > 0 && (
          <div className={mode === 'single' ? styles.singlePreviewContainer : styles.multiplePreviewContainer}>
          
            {/* ⬅️ ITERACIÓN: Mapeamos cada ítem */}
            {previewItems.map((item, index) => (
              
              // ⬅️ WRAPPER DE LA IMAGEN: Importante para posicionar la 'X'
              <div key={item.id} className={styles.previewWrapper}> 
                <img 
                  src={item.url} 
                  alt={`Preview ${index}`} 
                  className={styles.uploadedImagePreview} 
                />
                
                {/* ⬅️ BOTÓN DE ELIMINACIÓN INDIVIDUAL */}
                <button 
                  type="button" 
                  className={styles.removePreviewButton} 
                  // Esta función llama a onRemoveItem del padre con el índice correcto
                  onClick={() => onRemoveItem(index)} 
                  aria-label="Remove image"
                >
                  {mode === 'single' ? '✖️ Cambiar' : '✖️'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};