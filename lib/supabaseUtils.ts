import { User, createClient } from "@supabase/supabase-js"

const getSupabaseUrl = () => {
	if (process.env.NEXT_PUBLIC_SUPABASE_URL) return process.env.NEXT_PUBLIC_SUPABASE_URL
	throw new Error("Missing SUPABASE_URL environment variable")
}

const getSupabaseKey = () => {
	if (process.env.NEXT_PUBLIC_SUPABASE_KEY) return process.env.NEXT_PUBLIC_SUPABASE_KEY
	throw new Error("Missing SUPABASE_KEY environment variable")
}

export const supabase = createClient(getSupabaseUrl(), getSupabaseKey())

export async function getUser(): Promise<{ user: User }> {
	const res = await supabase.auth.getUser()
	if (res.error) throw new Error(res.error.message)
	return res.data
}
