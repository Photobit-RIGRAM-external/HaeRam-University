import { createSupabaseClient } from "./supabase/client";

export async function selectDepartments(schoolId: string) {

  const supabase = createSupabaseClient('university');

  const { data: departments, error } = await supabase
  .from('departments')
  .select('*')
  .eq('school_id', schoolId);

    if (error) {
      throw error;
    }

    return departments;
}

  export async function selectDepartmentById( departmentId: string ):  Promise<any> {

    const supabase = createSupabaseClient('university');

    const { data: department } = await supabase
      .from("departments")
      .select("*")
      .eq("id", departmentId)
      .single();

    return department;
  }

  export async function selectEvents(departmentId: string): Promise<any> {

    const supabase = createSupabaseClient('university');

    const { data: media } = await supabase
    .from('media')
    .select('*')
    .eq('department_id', departmentId)
    
    return media;
}

export async function selectExecutive(schoolId: string): Promise<any> {

    const supabase = createSupabaseClient('university');

    const { data: executive } = await supabase
    .from('executive')
    .select('*')
    .eq('school_id', schoolId)
    
    return executive;
}

export async function selectForeground(schoolId: string): Promise<any> {

    const supabase = createSupabaseClient('university');

    const { data: foreground } = await supabase
    .from('foreground')
    .select('*')
    .eq('school_id', schoolId)
    .single();
    
    return foreground;
}

export async function selectStudents(departmentId: string): Promise<any> {

    const supabase = createSupabaseClient('university');

    const { data: students } = await supabase
    .from('students')
    .select('*')
    .order('name', { ascending: true })
    .eq('dept_id', departmentId)
    
    return students;
}

export async function selectHistories(schoolId: string): Promise<any> {

    const supabase = createSupabaseClient('university');

    const { data: histories } = await supabase
    .from('history')
    .select('*')
    .order('date', { ascending: false })
    .eq('school_id', schoolId)
    
    return histories;
}

export async function selectStaffs(departmentId: string): Promise<any> {

    const supabase = createSupabaseClient('university');

    const { data: staffs } = await supabase
    .from('staffs')
    .select('*')
    .order('name', { ascending: true })
    .eq('department_id', departmentId)
    
    return staffs;
}

