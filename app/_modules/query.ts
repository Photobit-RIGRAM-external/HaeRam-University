"use client";

import { useQuery } from "@tanstack/react-query";
import { selectDepartments, 
         selectDepartmentById, 
         selectEvents, 
         selectExecutive, 
         selectForeground, 
         selectStudents,
         selectHistories,
         selectStaffs } from "./data";

export function useDepartments(schoolId: string) {
  return useQuery({
    queryKey: ["departments", schoolId],
    queryFn: () => selectDepartments(schoolId),
    enabled: !!schoolId,
  });
}

export function useDepartment(departmentId: string) {
  return useQuery({
    queryKey: ["department", departmentId],
    queryFn: () => selectDepartmentById(departmentId),
    enabled: !!departmentId,
  });
}

export function useEvents(departmentId?: string) {
  return useQuery({
    queryKey: ["media", departmentId],
    queryFn: () => selectEvents(departmentId!),
    enabled: !!departmentId,
  });
}

export function useExecutive(schoolId?: string) {
  return useQuery({
    queryKey: ["executive", schoolId],
    queryFn: () => selectExecutive(schoolId!),
    enabled: !!schoolId,
  });
}

export function useForeground(schoolId?: string) {
  return useQuery({
    queryKey: ["foreground", schoolId],
    queryFn: () => selectForeground(schoolId!),
    enabled: !!schoolId,
  });
}

export function useStudents(departmentId: string) {
  return useQuery({
    queryKey: ["students", departmentId],
    queryFn: () => selectStudents(departmentId!),
    enabled: !!departmentId,
  });
}

export function useHistories(schoolId?: string) {
  return useQuery({
    queryKey: ["history", schoolId],
    queryFn: () => selectHistories(schoolId!),
    enabled: !!schoolId,
  });
}

export function useStaffs(departmentId?: string) {
  return useQuery({
    queryKey: ["staffs", departmentId],
    queryFn: () => selectStaffs(departmentId!),
    enabled: !!departmentId,
  });
}