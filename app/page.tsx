import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/platform?view=strategy&strategyTab=potential');
}
