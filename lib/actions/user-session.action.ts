import createSupabaseServerClient from '../supabase/server';

const readUserSession = async () => {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
};

export default readUserSession;
