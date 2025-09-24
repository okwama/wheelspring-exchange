-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create cars table for storing car listings
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  mileage INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  body_type TEXT,
  color TEXT,
  description TEXT,
  location TEXT NOT NULL DEFAULT 'Local',
  type TEXT NOT NULL DEFAULT 'used' CHECK (type IN ('used', 'import')),
  exterior_images TEXT[] DEFAULT '{}',
  interior_images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for cars
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Create policies for cars (public read access since it's a marketplace)
CREATE POLICY "Anyone can view cars" 
ON public.cars 
FOR SELECT 
USING (true);

-- Create car_requests table for import requests
CREATE TABLE public.car_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year_min INTEGER,
  year_max INTEGER,
  budget_max DECIMAL(12,2),
  preferred_features TEXT[],
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for car requests
ALTER TABLE public.car_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for car requests
CREATE POLICY "Users can view their own requests" 
ON public.car_requests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own requests" 
ON public.car_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests" 
ON public.car_requests 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_car_requests_updated_at
  BEFORE UPDATE ON public.car_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample car data
INSERT INTO public.cars (make, model, year, price, mileage, fuel_type, transmission, body_type, color, description, location, type, exterior_images, interior_images, features, contact_name, contact_phone, is_featured) VALUES
('Toyota', 'Camry', 2022, 28500.00, 15000, 'Gasoline', 'Automatic', 'Sedan', 'Silver', 'Well-maintained sedan with excellent fuel economy', 'Local', 'used', ARRAY['/src/assets/car-sedan-luxury.jpg'], ARRAY['/src/assets/car-sedan-luxury.jpg'], ARRAY['Bluetooth', 'Backup Camera', 'Cruise Control'], 'John Dealer', '+1-555-0123', true),
('BMW', 'X5', 2021, 45900.00, 25000, 'Gasoline', 'Automatic', 'SUV', 'Black', 'Luxury SUV with premium features', 'Local', 'used', ARRAY['/src/assets/car-suv-black.jpg'], ARRAY['/src/assets/car-suv-black.jpg'], ARRAY['Leather Seats', 'Navigation', 'Sunroof', 'AWD'], 'Sarah Motors', '+1-555-0456', true),
('Porsche', '911', 2023, 125000.00, 5000, 'Gasoline', 'Manual', 'Coupe', 'Red', 'High-performance sports car in excellent condition', 'Import', 'import', ARRAY['/src/assets/car-sports-red.jpg'], ARRAY['/src/assets/car-sports-red.jpg'], ARRAY['Sport Package', 'Carbon Fiber Interior', 'Track Mode'], 'Elite Imports', '+1-555-0789', true),
('Ford', 'F-150', 2020, 32000.00, 45000, 'Gasoline', 'Automatic', 'Truck', 'White', 'Reliable work truck with towing capacity', 'Local', 'used', ARRAY['/src/assets/car-truck-white.jpg'], ARRAY['/src/assets/car-truck-white.jpg'], ARRAY['Towing Package', '4WD', 'Bed Liner'], 'Mike Trucks', '+1-555-0321', false);