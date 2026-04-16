/**
 * Tipos de la base de datos (equivale a tus modelos / DTOs en .NET)
 *
 * Este archivo se puede auto-generar con el CLI de Supabase:
 *   npx supabase gen types typescript --project-id TU_PROJECT_ID > src/types/database.ts
 *
 * Por ahora definimos la estructura manualmente según el schema del marketplace.
 * Cuando conectes Supabase, reemplaza este archivo con el generado automáticamente.
 */

export type Database = {
  public: {
    Tables: {
      /** Experiencias turísticas listadas por proveedores */
      experiences: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          price: number;              // En USD
          duration_hours: number;
          max_capacity: number;
          location: string;
          country: string;            // 'DO', 'MX', 'CO', etc.
          category: ExperienceCategory;
          images: string[];           // URLs de Supabase Storage
          provider_id: string;        // FK → providers.id
          is_active: boolean;
          avg_rating: number | null;
          total_reviews: number;
        };
        Insert: Omit<Database["public"]["Tables"]["experiences"]["Row"], "id" | "created_at" | "avg_rating" | "total_reviews">;
        Update: Partial<Database["public"]["Tables"]["experiences"]["Insert"]>;
      };

      /** Proveedores de experiencias (guías, agencias, operadores) */
      providers: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;            // FK → auth.users.id (Supabase Auth)
          business_name: string;
          description: string;
          phone: string;
          whatsapp: string | null;
          country: string;
          city: string;
          stripe_account_id: string | null;  // Para Stripe Connect
          is_verified: boolean;
          is_active: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["providers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["providers"]["Insert"]>;
      };

      /** Reservas realizadas por viajeros */
      bookings: {
        Row: {
          id: string;
          created_at: string;
          experience_id: string;      // FK → experiences.id
          traveler_id: string;        // FK → auth.users.id
          provider_id: string;        // FK → providers.id
          booking_date: string;       // ISO date string
          participants: number;
          total_amount: number;       // Total cobrado al viajero (USD)
          platform_fee: number;       // Comisión de Routa (USD)
          provider_amount: number;    // Lo que recibe el proveedor (USD)
          status: BookingStatus;
          stripe_payment_intent_id: string | null;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };

      /** Reseñas de experiencias */
      reviews: {
        Row: {
          id: string;
          created_at: string;
          booking_id: string;         // FK → bookings.id (1 reseña por reserva)
          experience_id: string;
          traveler_id: string;
          rating: number;             // 1-5
          comment: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["reviews"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };
  };
};

// ─── Tipos auxiliares ────────────────────────────────────────────────────────

export type ExperienceCategory =
  | "aventura"
  | "cultural"
  | "gastronomia"
  | "naturaleza"
  | "playa"
  | "ciudad"
  | "noche"
  | "otro";

export type BookingStatus =
  | "pending"       // Reserva creada, pago pendiente
  | "confirmed"     // Pago confirmado
  | "completed"     // Experiencia realizada
  | "cancelled"     // Cancelada
  | "refunded";     // Reembolsada

// Helpers para extraer tipos de las tablas (como trabajarías con records en .NET)
export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type Provider   = Database["public"]["Tables"]["providers"]["Row"];
export type Booking    = Database["public"]["Tables"]["bookings"]["Row"];
export type Review     = Database["public"]["Tables"]["reviews"]["Row"];
