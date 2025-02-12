
import { createClient } from '@supabase/supabase-js';
import { Task, Event } from '@/types/task';

// Acessando as credenciais do Supabase diretamente
const supabaseUrl = 'https://vaihyumaqzvqoyotxtfz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaWh5dW1hcXp2cW95b3R4dGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyOTc4NTMsImV4cCI6MjA1NDg3Mzg1M30.zPfv_eYoYLCfJD8UzSpJEPNCV2lbCCAknfb1vcpdTc0';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tasks
export async function fetchTasks() {
  const { data, error } = await supabase
    .from('demands')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data as Task[];
}

export async function addTask(title: string, category: string) {
  const { data, error } = await supabase
    .from('demands')
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
    .from('demands')
    .update(task)
    .eq('id', task.id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Task;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('demands')
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
        title: name,
        description: `${name} Event`,
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
    .update({
      title: updates.name,
      description: updates.description,
    })
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
