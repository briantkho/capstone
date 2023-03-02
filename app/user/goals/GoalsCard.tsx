import { Card } from '@/app/components/Card/Card';
import { CategoryTypes } from '@/app/utils/CategoryTypes';
import { createClient } from '@/app/utils/supabase-server';

const getData = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  let { data, error, status } = await supabase
    .from('goal')
    .select('*')
    .eq('user_id', user.user?.id);

  if (error && status !== 406) {
    throw error;
  }

  if (!data) throw error;

  return data;
};

// const getSub = async () => {
//   const supabase = createClient();

//   supabase
//     .channel('goal')
//     .on(
//       'postgres_changes',
//       { event: '*', schema: 'public', table: 'goal' },
//       (payload) => {
//          payload.new;
//       }
//     )
//     .subscribe();
// };

export default async function GoalsCard() {
  let goals = await getData();

  return (
    <>
      <Card category={CategoryTypes.goals} data={goals} />
    </>
  );
}
