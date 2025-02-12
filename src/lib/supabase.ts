
import { createClient } from '@supabase/supabase-js';
import { Task, Event } from '@/types/task';
import { supabase } from '@/integrations/supabase/client';

// Tasks
export async function fetchTasks() {
  const { data, error } = await supabase
    .from('demands')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data.map(task => ({
    ...task,
    category: task.event_id
  })) as Task[];
}

export async function addTask(title: string, category: string) {
  const { data, error } = await supabase
    .from('demands')
    .insert([
      { 
        title, 
        event_id: category,
        status: 'todo'
      }
    ])
    .select()
    .single();
    
  if (error) throw error;
  return {
    ...data,
    category: data.event_id
  } as Task;
}

export async function updateTask(task: Task) {
  const { data, error } = await supabase
    .from('demands')
    .update({
      ...task,
      event_id: task.category
    })
    .eq('id', task.id)
    .select()
    .single();
    
  if (error) throw error;
  return {
    ...data,
    category: data.event_id
  } as Task;
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
  
  return data.map(event => ({
    ...event,
    name: event.title
  })) as Event[];
}

export async function addEvent(name: string) {
  const { data, error } = await supabase
    .from('events')
    .insert([
      { 
        title: name,
        description: `${name} Event`,
        date: new Date().toISOString()
      }
    ])
    .select()
    .single();
    
  if (error) throw error;
  return {
    ...data,
    name: data.title
  } as Event;
}

export async function updateEvent(id: string, updates: Partial<Event>) {
  const { data, error } = await supabase
    .from('events')
    .update({
      title: updates.name,
      description: updates.description,
      banner: updates.banner,
      date: updates.date
    })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return {
    ...data,
    name: data.title
  } as Event;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}

// Upload de imagem
export async function uploadEventBanner(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('event_banners')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('event_banners')
    .getPublicUrl(fileName);

  return data.publicUrl;
}
