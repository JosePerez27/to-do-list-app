export const HomeConfig = Object.freeze({
  toast: {
    completedTask: {
      message: '¡Tarea completada!',
    },
    createdTask: {
      message: 'Tarea creada exitosamente',
    },
    deletedTask: {
      message: 'Tarea eliminada',
    }
  },
  alert: {
    deleteTask: {
      header: 'Eliminar tarea',
      message: '¿Está seguro que desea eliminar la tarea?',
      buttons: {
        cancel: 'No',
        accept: 'Si'
      }
    }
  },
  modal: {
    createTask: {
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      backdropBreakpoint: 0,
      cssClass: 'height-auto'
    }
  },
  texts: {
    pendingSegment: 'Pendientes',
    completedSegment: 'Completadas',
    category: 'Categoría',
    emptyPendingTasks: 'Aún no tienes tareas, ¡Crea una para empezar!',
    emptyCompletedTasks: 'Aún no tienes tareas completadas'
  },
  remoteConfigKeys: {
    homeTitle: 'homeTitle',
    enableDeleteTask: 'enableDeleteTask',
  }
});
