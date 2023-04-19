import { User, createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://wbtyvreewfalhfbgxbcf.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidHl2cmVld2ZhbGhmYmd4YmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4NzgzNzAsImV4cCI6MTk5NjQ1NDM3MH0.rybH4DuhLESJk8suv-MUp5-z7Pde4UCdi0ySPPUJNms"
);

export async function getUser(): Promise<{ user: User }> {
	const res = await supabase.auth.getUser();
	if (res.error) throw new Error(res.error.message);
	return res.data;
}
