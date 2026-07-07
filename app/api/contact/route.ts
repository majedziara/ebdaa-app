import { createServerSupabaseClient } from "@/app/utils/supabase/supabaseClientServer";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers"; // تأكد من استيراد cookies من next/headers بشكل صحيح.

export async function POST(req: Request) {
  const t = await getTranslations("contactSection");
  try {
    const body = await req.json();
    const { name, email, phoneNumber, subject, message } = body; // تأكد من إرسال الحقول المطلوبة

    // تحقق من الحقول المفقودة
    if (!name || !email || !phoneNumber || !subject || !message) {
      return Response.json({ message: t("missingFields") }, { status: 400 });
    }

    // استخدام cookies() بالشكل الصحيح في Edge Functions
    const cookieStore = await cookies();

    // استخدم createServerSupabaseClient بشكل غير متزامن
    const supabase = await createServerSupabaseClient(cookieStore);

    // إرسال البيانات إلى Supabase
    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone_number: phoneNumber,
        subject,
        message,
      },
    ]);

    if (error) {
      return Response.json({ message: t("error") }, { status: 500 });
    }

    return Response.json({ message: t("success") });
  } catch (error) {
    return Response.json({ message: t("error") }, { status: 500 });
  }
}
