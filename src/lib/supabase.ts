
import { createClient } from '@supabase/supabase-js';
import { Task, Event } from '@/types/task';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tasks
export async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data as Task[];
}

export async function addTask(title: string, category: string) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      { 
        title, 
        category,
        status: 'todo'
      }
    ])
    .select()
    .single();
    
  if (error) throw error;
  return data as Task;
}

export async function updateTask(task: Task) {
  const { data, error } = await supabase
    .from('tasks')
    .update(task)
    .eq('id', task.id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Task;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}

// Events
export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data as Event[];
}

export async function addEvent(name: string) {
  const { data, error } = await supabase
    .from('events')
    .insert([
      { 
        name,
        description: `${name} Event`,
        banner: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
      }
    ])
    .select()
    .single();
    
  if (error) throw error;
  return data as Event;
}

export async function updateEvent(id: string, updates: Partial<Event>) {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Event;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}
