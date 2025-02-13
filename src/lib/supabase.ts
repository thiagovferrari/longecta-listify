
import { createClient } from '@supabase/supabase-js';
import { Task, Event } from '@/types/task';
import { supabase } from '@/integrations/supabase/client';

// Tasks
export async function fetchTasks() {
  console.log('Fetching tasks...');
  const { data, error } = await supabase
    .from('demands')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
  
  console.log('Raw tasks data:', data);
  const mappedTasks = data.map(task => ({
    ...task,
    id: task.id,
    category: task.event_id,
    status: task.status === 'pendente' ? 'todo' : task.status,
    title: task.title
  }));
  console.log('Mapped tasks:', mappedTasks);
  return mappedTasks as Task[];
}

export async function addTask(title: string, category: string) {
  console.log('Adding task:', { title, category });
  const { data, error } = await supabase
    .from('demands')
    .insert({
      title, 
      event_id: category,
      status: 'pendente',
      user_id: '00000000-0000-0000-0000-000000000000'
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error adding task:', error);
    throw error;
  }

  console.log('Added task data:', data);
  return {
    ...data,
    id: data.id,
    category: data.event_id,
    status: 'todo',
    title: data.title
  } as Task;
}

export async function updateTask(task: Task) {
  console.log('Updating task:', task);
  const { data, error } = await supabase
    .from('demands')
    .update({
      title: task.title,
      status: task.status === 'todo' ? 'pendente' : task.status,
      event_id: task.category,
      user_id: '00000000-0000-0000-0000-000000000000'
    })
    .eq('id', task.id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating task:', error);
    throw error;
  }

  console.log('Updated task data:', data);
  return {
    ...data,
    id: data.id,
    category: data.event_id,
    status: data.status === 'pendente' ? 'todo' : data.status,
    title: data.title
  } as Task;
}

export async function deleteTask(id: string) {
  console.log('Deleting task:', id);
  const { error } = await supabase
    .from('demands')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

// Events
export async function fetchEvents() {
  console.log('Fetching events...');
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  
  console.log('Raw events data:', data);
  const mappedEvents = data.map(event => ({
    ...event,
    id: event.id,
    name: event.title,
    description: event.description || '',
    date: event.date
  }));
  console.log('Mapped events:', mappedEvents);
  return mappedEvents as Event[];
}

export async function addEvent(name: string) {
  console.log('Adding event:', name);
  const { data, error } = await supabase
    .from('events')
    .insert({
      title: name,
      description: `${name} Event`,
      date: new Date().toISOString(),
      user_id: '00000000-0000-0000-0000-000000000000'
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error adding event:', error);
    throw error;
  }

  console.log('Added event data:', data);
  return {
    ...data,
    id: data.id,
    name: data.title,
    description: data.description || '',
    date: data.date
  } as Event;
}

export async function updateEvent(id: string, updates: Partial<Event>) {
  console.log('Updating event:', { id, updates });
  const { data, error } = await supabase
    .from('events')
    .update({
      title: updates.name,
      description: updates.description,
      banner: updates.banner,
      date: updates.date,
      user_id: '00000000-0000-0000-0000-000000000000'
    })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }

  console.log('Updated event data:', data);
  return {
    ...data,
    id: data.id,
    name: data.title,
    description: data.description || '',
    date: data.date
  } as Event;
}

export async function deleteEvent(id: string) {
  console.log('Deleting event:', id);
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
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
