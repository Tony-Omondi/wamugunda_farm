import axios, { AxiosError } from 'axios';

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
interface EndpointConfig<T> {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
}

// Interface for API configuration
interface ApiConfig {
  baseUrl: string;
  endpoints: Record<string, EndpointConfig<any>>;
}

// Static configuration based on Django URL patterns
const STATIC_API_CONFIG: ApiConfig = {
  baseUrl: 'http://127.0.0.1:8000/api/', // hardcoded for testing
  endpoints: {
    categories: { path: 'categories/', method: 'get' },
    produce: { path: 'produce/', method: 'get' },
    produceDetail: { path: 'produce/', method: 'get' },
    orders: { path: 'orders/', method: 'post' },
    testimonials: { path: 'testimonials/', method: 'get' },
    media: { path: 'media/', method: 'get' },
  },
};


// Dynamic API client
class DynamicApiClient {
  private config: ApiConfig;

  constructor() {
    this.config = STATIC_API_CONFIG;
    // Ensure baseUrl ends with a slash
    if (!this.config.baseUrl.endsWith('/')) {
      this.config.baseUrl += '/';
    }
  }

  private async callEndpoint<T>(
    endpointKey: string,
    data?: any,
    id?: number,
    queryParams?: Record<string, string | number>,
    retries: number = 2
  ): Promise<T> {
    const endpoint = this.config.endpoints[endpointKey];
    if (!endpoint) {
      throw new Error(`Endpoint ${endpointKey} not found in configuration.`);
    }

    let url = id ? `${this.config.baseUrl}${endpoint.path}${id}/` : `${this.config.baseUrl}${endpoint.path}`;
    
    // Append query parameters if provided
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams as any).toString();
      url += `?${queryString}`;
    }

    const axiosConfig = {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers here if needed in the future
        // 'Authorization': `Bearer ${token}`,
      },
    };

    try {
      let response;
      switch (endpoint.method) {
        case 'get':
          response = await axios.get<T>(url, axiosConfig);
          break;
        case 'post':
          response = await axios.post<T>(url, data, axiosConfig);
          break;
        case 'put':
          response = await axios.put<T>(url, data, axiosConfig);
          break;
        case 'delete':
          response = await axios.delete<T>(url, axiosConfig);
          break;
        default:
          throw new Error(`Unsupported method: ${endpoint.method}`);
      }
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      if (axiosError.response && retries > 0 && axiosError.response.status >= 500) {
        // Retry on server errors (5xx)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.callEndpoint<T>(endpointKey, data, id, queryParams, retries - 1);
      }

      const errorDetails = {
        message: axiosError.message,
        code: axiosError.code,
        status: axiosError.response?.status,
        response: axiosError.response?.data,
      };
      console.error(`Error calling endpoint ${endpointKey}:`, errorDetails);

      let userMessage = `Failed to call ${endpointKey}. Please try again later.`;
      if (axiosError.response?.status === 404) {
        userMessage = `Resource not found for ${endpointKey}.`;
      } else if (axiosError.response?.status === 400) {
        userMessage = `Invalid request for ${endpointKey}. Please check your input.`;
      } else if (axiosError.response?.status >= 500) {
        userMessage = `Server error for ${endpointKey}. Please try again later.`;
      }

      throw new Error(userMessage);
    }
  }

  async getCategories(): Promise<Category[]> {
    return this.callEndpoint<Category[]>('categories');
  }

  async getProduceList(params?: { category?: number; search?: string }): Promise<Produce[]> {
    const queryParams = params ? {
      ...(params.category && { category: params.category }),
      ...(params.search && { search: params.search }),
    } : undefined;
    const products = await this.callEndpoint<Produce[]>('produce', undefined, undefined, queryParams);
    // Ensure defaults for required fields
    return products.map(product => ({
      ...product,
      name: product.name || 'Unnamed Product',
      image: product.image || 'https://via.placeholder.com/400',
      description: product.description || 'No description available.',
      price: product.price || '0.00',
      images: product.images || [],
      nutrition: product.nutrition || [],
      benefits: product.benefits || [],
      category: product.category || { id: 0, name: 'Unknown' },
    }));
  }

  async getProduceDetail(id: number): Promise<Produce> {
    const product = await this.callEndpoint<Produce>('produceDetail', undefined, id);
    // Ensure defaults for required fields
    return {
      ...product,
      name: product.name || 'Unnamed Product',
      image: product.image || 'https://via.placeholder.com/400',
      description: product.description || 'No description available.',
      price: product.price || '0.00',
      images: product.images || [],
      nutrition: product.nutrition || [],
      benefits: product.benefits || [],
      category: product.category || { id: 0, name: 'Unknown' },
    };
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