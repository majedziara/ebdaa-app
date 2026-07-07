import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers"; // تأكد من استيراد cookies من next/headers بشكل صحيح.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createServerSupabaseClient = async (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) => {
  // التأكد من استخدام await للحصول على الكوكيز بشكل غير متزامن
  const resolvedCookieStore = await cookieStore;

  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return resolvedCookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            resolvedCookieStore.set(name, value, options),
          );
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      },
    },
  });
};
