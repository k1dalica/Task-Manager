import Dashboard from '@/components/Dashboard'
import Login from '@/components/login/Login'
import Tasks from '@/components/tasks/Tasks'
import AssignedToMe from '@/components/tasks/AssignedToMe'
import NewTask from '@/components/tasks/NewTask'
import Task from '@/components/tasks/Task'
import EditTask from '@/components/tasks/EditTask'

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    redirect: { name: 'Tasks' },
    meta: { requiresAuth: true },
    children: [
      {
        name: 'Tasks',
        path: 'tasks',
        component: Tasks
      },
      {
        name: 'AssignedToMe',
        path: 'assigned-to-me',
        component: AssignedToMe
      },
      {
        name: 'NewTask',
        path: 'new-task',
        component: NewTask
      },
      {
        name: 'Task',
        path: 'task/:id',
        component: Task
      },
      {
        name: 'EditTask',
        path: 'edit-task/:id',
        component: EditTask
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '*',
    name: 'default',
    redirect: { name: 'Login' }
  }
]
