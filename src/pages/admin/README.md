# Admin Panel

This folder contains admin-only pages for managing the car inventory.

## Car Upload Page (`/admin/car-upload`)

A comprehensive form for adding new vehicles to the inventory.

### Features:
- **Multi-step tabbed interface** with organized sections:
  - Basic Info: Name, year, description, category, brand, model
  - Technical: Mileage, condition, colors, VIN, registration
  - Pricing: Price, currency, dealer info, featured status  
  - Images: Multiple images with categorization

- **Smart data loading**:
  - Auto-loads brands and categories on page load
  - Dynamically loads models when brand is selected
  - Loads variants when model is selected (optional)

- **Image management**:
  - Support for multiple image types (exterior, interior, 360°, engine, etc.)
  - Primary image selection
  - Image ordering and alt text
  - Real-time image preview

- **Form validation**:
  - Required field validation
  - Data type validation
  - Success/error handling with toast notifications

- **Database integration**:
  - Full CRUD API endpoints
  - Proper error handling
  - Progress indicators

### Database Schema Integration:

The form is built to match the database schema from `gold.SQL`:

- **Products table**: Main car record with all essential fields
- **Car_images table**: Categorized images with types and ordering
- **Brands/Models/Categories**: Relational data for dropdowns
- **Variants**: Optional detailed specifications

### API Endpoints Used:

- `GET /api/cars/brands` - Load all brands
- `GET /api/cars/categories` - Load all categories  
- `GET /api/cars/brands/:id/models` - Load models for brand
- `GET /api/cars/models/:id/variants` - Load variants for model
- `POST /api/cars` - Create new car
- `POST /api/cars/:id/images` - Upload car images

### Access:
- Only visible to authenticated users
- Available via navigation menu (Admin link)
- Direct URL: `/admin/car-upload`

### TODO:
- Add image file upload (currently URL-based)
- Add bulk import functionality
- Add car editing/management interface
- Add user role-based permissions
