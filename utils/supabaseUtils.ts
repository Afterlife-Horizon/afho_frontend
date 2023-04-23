import { User, createClient } from "@supabase/supabase-js"

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_KEY || "")

export async function getUser(): Promise<{ user: User }> {
	const res = await supabase.auth.getUser()
	if (res.error) throw new Error(res.error.message)
	return res.data
}
