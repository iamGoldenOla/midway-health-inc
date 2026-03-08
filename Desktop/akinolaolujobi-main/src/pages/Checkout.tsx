import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, CreditCard, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Paystack public key
const PAYSTACK_PUBLIC_KEY = 'pk_live_4ea381746676c75f9c4a4d56a59c3cc6c94e6162';
const WHATSAPP_NUMBER = '2348012345678'; // Replace with actual WhatsApp number

export default function Checkout() {
  const { state, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const config = {
    reference: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: customerInfo.email,
    amount: totalPrice * 100, // Paystack expects amount in kobo
    publicKey: PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [
        {
          display_name: 'Customer Name',
          variable_name: 'customer_name',
          value: customerInfo.name,
        },
        {
          display_name: 'Phone Number',
          variable_name: 'phone_number',
          value: customerInfo.phone,
        },
        {
          display_name: 'Items',
          variable_name: 'items',
          value: state.items.map(item => `${item.title} x${item.quantity}`).join(', '),
        },
      ],
    },
  };

  const onSuccess = async (reference: any) => {
    try {
      // 1. Log the transaction in Supabase
      const itemsList = state.items.map(item => `${item.title} x${item.quantity}`).join(', ');

      const { error } = await supabase
        .from('transactions')
        .insert([
          {
            reference: reference.reference || config.reference,
            customer_email: customerInfo.email,
            amount_paid: totalPrice,
            product_name: itemsList,
            status: 'success'
          }
        ]);

      if (error) {
        console.error("Failed to log transaction to Supabase:", error);
        // We don't throw heavily here because the payment succeeded, we just failed to log it locally.
        // In a real app, you'd likely depend on Paystack Webhooks for a source of truth anyway.
      }

      toast({
        title: 'Payment Successful!',
        description: 'Your e-books will be sent to your email shortly.',
      });

      // 2. Send WhatsApp notification mapping
      sendWhatsAppNotification(reference.reference || config.reference);

      // 3. Clear cart and redirect
      clearCart();
      navigate('/e-books');

    } catch (err) {
      console.error("Checkout success handler error:", err);
    }
  };

  const onClose = () => {
    toast({
      title: 'Payment Cancelled',
      description: 'You can try again when ready.',
      variant: 'destructive',
    });
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    initializePayment({ onSuccess, onClose });
  };

  const sendWhatsAppNotification = (reference: string) => {
    const itemsList = state.items
      .map(item => `• ${item.title} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
      .join('%0A');

    const message = `🛒 *New E-Book Order*%0A%0A*Reference:* ${reference}%0A%0A*Customer Details:*%0AName: ${customerInfo.name}%0AEmail: ${customerInfo.email}%0APhone: ${customerInfo.phone}%0A%0A*Items Ordered:*%0A${itemsList}%0A%0A*Total:* ${formatPrice(totalPrice)}%0A%0APlease send the e-books to the customer's email.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleWhatsAppOrder = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const itemsList = state.items
      .map(item => `• ${item.title} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
      .join('%0A');

    const message = `🛒 *E-Book Order Request*%0A%0A*Customer Details:*%0AName: ${customerInfo.name}%0AEmail: ${customerInfo.email}%0APhone: ${customerInfo.phone}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total:* ${formatPrice(totalPrice)}%0A%0AI would like to purchase these e-books. Please send payment details.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="pt-16 md:pt-[7.25rem]">
          <section className="section-padding">
            <div className="container-custom px-4 md:px-8 text-center">
              <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Add some e-books to your cart before checking out.
              </p>
              <Button asChild>
                <a href="/e-books">Browse E-Books</a>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        {/* Hero */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container-custom px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Checkout
            </h1>
            <p className="text-primary-foreground/80">
              Complete your purchase and get your e-books delivered instantly
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Order Summary */}
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Your Details
                </h2>
                <form onSubmit={handlePaystackPayment} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Your e-books will be delivered to this email
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <Button type="submit" className="w-full" size="lg">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay with Paystack
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                      size="lg"
                      onClick={handleWhatsAppOrder}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Order via WhatsApp
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
