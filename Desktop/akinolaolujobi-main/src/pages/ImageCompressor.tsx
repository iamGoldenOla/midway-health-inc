import { useState, useCallback } from 'react';
import { Upload, Download, Image, Trash2, Settings2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/shared/SEOHead';

interface CompressedImage {
  id: string;
  originalFile: File;
  compressedFile: File | null;
  originalSize: number;
  compressedSize: number;
  progress: number;
  status: 'pending' | 'compressing' | 'done' | 'error';
  previewUrl: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ImageCompressor = () => {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState([80]);
  const [maxWidth, setMaxWidth] = useState([1920]);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: CompressedImage[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: crypto.randomUUID(),
        originalFile: file,
        compressedFile: null,
        originalSize: file.size,
        compressedSize: 0,
        progress: 0,
        status: 'pending' as const,
        previewUrl: URL.createObjectURL(file),
      }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    
    const newImages: CompressedImage[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: crypto.randomUUID(),
        originalFile: file,
        compressedFile: null,
        originalSize: file.size,
        compressedSize: 0,
        progress: 0,
        status: 'pending' as const,
        previewUrl: URL.createObjectURL(file),
      }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const compressImages = async () => {
    setIsCompressing(true);

    for (const image of images) {
      if (image.status === 'done') continue;

      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, status: 'compressing' as const } : img
      ));

      try {
        const options = {
          maxSizeMB: 10,
          maxWidthOrHeight: maxWidth[0],
          useWebWorker: true,
          initialQuality: quality[0] / 100,
          onProgress: (progress: number) => {
            setImages(prev => prev.map(img => 
              img.id === image.id ? { ...img, progress } : img
            ));
          },
        };

        const compressedFile = await imageCompression(image.originalFile, options);

        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { 
                ...img, 
                compressedFile, 
                compressedSize: compressedFile.size,
                status: 'done' as const,
                progress: 100,
              } 
            : img
        ));
      } catch (error) {
        console.error('Compression error:', error);
        setImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, status: 'error' as const } : img
        ));
      }
    }

    setIsCompressing(false);
  };

  const downloadImage = (image: CompressedImage) => {
    if (!image.compressedFile) return;
    
    const url = URL.createObjectURL(image.compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${image.originalFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    images.forEach(image => {
      if (image.compressedFile) {
        downloadImage(image);
      }
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  };

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressedSize = images.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalSaved = totalOriginalSize - totalCompressedSize;
  const savingsPercent = totalOriginalSize > 0 
    ? Math.round((totalSaved / totalOriginalSize) * 100) 
    : 0;

  return (
    <>
      <SEOHead 
        title="Free Image Compressor | Compress Images Online"
        description="Compress your images for free with our browser-based tool. No upload limits, privacy-first - your images never leave your device."
      />
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom px-4 md:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Free Image Compressor
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compress your images directly in your browser. Fast, free, and private - 
              your images never leave your device.
            </p>
          </div>

          {/* Settings Panel */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings2 className="w-5 h-5 text-coral" />
                <h2 className="text-lg font-semibold">Compression Settings</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Label className="mb-3 block">
                    Quality: <span className="text-coral font-semibold">{quality[0]}%</span>
                  </Label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={10}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Lower quality = smaller file size
                  </p>
                </div>
                <div>
                  <Label className="mb-3 block">
                    Max Width: <span className="text-coral font-semibold">{maxWidth[0]}px</span>
                  </Label>
                  <Slider
                    value={maxWidth}
                    onValueChange={setMaxWidth}
                    min={320}
                    max={4096}
                    step={64}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Images wider than this will be resized
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card className="mb-8">
            <CardContent className="p-0">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center hover:border-coral/50 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drop images here or click to upload
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG, WebP, and GIF
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Images List */}
          {images.length > 0 && (
            <>
              {/* Stats Bar */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Original: </span>
                        <span className="font-semibold">{formatFileSize(totalOriginalSize)}</span>
                      </div>
                      {totalCompressedSize > 0 && (
                        <>
                          <div>
                            <span className="text-sm text-muted-foreground">Compressed: </span>
                            <span className="font-semibold text-coral">{formatFileSize(totalCompressedSize)}</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {savingsPercent}% saved
                          </Badge>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={compressImages}
                        disabled={isCompressing || images.every(img => img.status === 'done')}
                        className="bg-coral hover:bg-coral/90"
                      >
                        {isCompressing ? 'Compressing...' : 'Compress All'}
                      </Button>
                      {images.some(img => img.compressedFile) && (
                        <Button onClick={downloadAll} variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download All
                        </Button>
                      )}
                      <Button onClick={clearAll} variant="ghost" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map(image => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      <img
                        src={image.previewUrl}
                        alt={image.originalFile.name}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 w-8 h-8"
                        onClick={() => removeImage(image.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium text-sm truncate mb-2" title={image.originalFile.name}>
                        {image.originalFile.name}
                      </p>
                      
                      {image.status === 'compressing' && (
                        <Progress value={image.progress} className="mb-2" />
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {formatFileSize(image.originalSize)}
                        </span>
                        {image.status === 'done' && image.compressedSize > 0 && (
                          <span className="text-coral font-medium">
                            → {formatFileSize(image.compressedSize)}
                            <span className="text-green-600 ml-2">
                              (-{Math.round((1 - image.compressedSize / image.originalSize) * 100)}%)
                            </span>
                          </span>
                        )}
                      </div>

                      {image.status === 'done' && image.compressedFile && (
                        <Button
                          onClick={() => downloadImage(image)}
                          className="w-full mt-3 bg-coral hover:bg-coral/90"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}

                      {image.status === 'error' && (
                        <p className="text-sm text-destructive mt-2">Compression failed</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-coral" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All compression happens in your browser. Your images never leave your device.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-coral" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No Limits</h3>
              <p className="text-sm text-muted-foreground">
                Compress as many images as you want. No file size limits, no daily quotas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-coral" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Instant Download</h3>
              <p className="text-sm text-muted-foreground">
                Download compressed images instantly. Works offline too!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ImageCompressor;
