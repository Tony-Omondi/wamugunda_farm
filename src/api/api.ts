
import axios from 'axios';

// Interfaces aligned with Django models from API response
interface Category {
  id: number;
  name: string;
  description?: string;
}

interface ProduceImage {
  id: number;
  image: string;
  alt_text?: string;
}

interface NutritionInfo {
  id: number;
  name: string;
  value: string;
}

interface HealthBenefit {
  id: number;
  description: string;
}

interface Produce {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: string;
  seasonal: boolean;
  stock_quantity: number;
  image: string;
  available: boolean;
  badge?: string;
  original_price?: string;
  delivery_time?: string;
  is_organic: boolean;
  rating: number;
  review_count: number;
  details?: string;
  storage_tips?: string;
  images: ProduceImage[];
  nutrition: NutritionInfo[];
  benefits: HealthBenefit[];
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface OrderItem {
  id: number;
  produce: Produce;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  customer: Customer;
  order_date: string;
  total_price: string;
  status: 'pending' | 'delivered' | 'canceled';
  items: OrderItem[];
}

interface Testimonial {
  id: number;
  customer: Customer;
  produce: Produce;
  rating: number;
  comment: string;
  created_at: string;
}

interface Media {
  id: number;
  title: string;
  image: string;
  description: string;
}

// Interface for endpoint configuration
interface EndpointConfig {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  responseType: string;
}

// Interface for API configuration
interface ApiConfig {
  baseUrl: string;
  endpoints: Record<string, EndpointConfig>;
}

// Static configuration based on Django URL patterns
const STATIC_API_CONFIG: ApiConfig = {
  baseUrl: 'http://127.0.0.1:8000/api/',
  endpoints: {
    categories: { path: 'categories/', method: 'get', responseType: 'Category[]' },
    produce: { path: 'produce/', method: 'get', responseType: 'Produce[]' },
    produceDetail: { path: 'produce/', method: 'get', responseType: 'Produce' },
    orders: { path: 'orders/', method: 'post', responseType: 'Order' },
    testimonials: { path: 'testimonials/', method: 'get', responseType: 'Testimonial[]' },
    media: { path: 'media/', method: 'get', responseType: 'Media[]' },
  },
};

// Dynamic API client
class DynamicApiClient {
  private config: ApiConfig;

  constructor() {
    this.config = STATIC_API_CONFIG;
  }

  private async callEndpoint<T>(endpointKey: string, data?: any, id?: number): Promise<T> {
    const endpoint = this.config.endpoints[endpointKey];
    if (!endpoint) {
      throw new Error(`Endpoint ${endpointKey} not found in configuration.`);
    }

    const url = id ? `${this.config.baseUrl}${endpoint.path}${id}/` : `${this.config.baseUrl}${endpoint.path}`;
    const config = { timeout: 5000 }; // Inline config without AxiosRequestConfig

    try {
      let response;
      switch (endpoint.method) {
        case 'get':
          response = await axios.get<T>(url, config);
          break;
        case 'post':
          response = await axios.post<T>(url, data, config);
          break;
        case 'put':
          response = await axios.put<T>(url, data, config);
          break;
        case 'delete':
          response = await axios.delete<T>(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${endpoint.method}`);
      }
      return response.data;
    } catch (error: any) {
      console.error(`Error calling endpoint ${endpointKey}:`, {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(`Failed to call ${endpointKey}. Please check your network or backend server.`);
    }
  }

  async getCategories(): Promise<Category[]> {
    return this.callEndpoint<Category[]>('categories');
  }

  async getProduceList(): Promise<Produce[]> {
    return this.callEndpoint<Produce[]>('produce');
  }

  async getProduceDetail(id: number): Promise<Produce> {
    return this.callEndpoint<Produce>('produceDetail', undefined, id);
  }

  async createOrder(orderData: {
    customer_id: number;
    items: { produce_id: number; quantity: number; price: string }[];
  }): Promise<Order> {
    return this.callEndpoint<Order>('orders', orderData);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.callEndpoint<Testimonial[]>('testimonials');
  }

  async getMedia(): Promise<Media[]> {
    return this.callEndpoint<Media[]>('media');
  }
}

const api = new DynamicApiClient();
export default api;

export { Produce, Testimonial, Media, Category, Customer, Order, OrderItem, ProduceImage, NutritionInfo, HealthBenefit };
