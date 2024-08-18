export const ManageCategoriesConfig = Object.freeze({
  toast: {
    createCategory: {
      message: 'Categoría creada',
      errorMessage: 'Debe ingresar un nombre para la categoría',
    },
    editCategory: {
      message: 'Categoría editada',
      errorMessage: 'Debe ingresar un nombre para la categoría',
    },
    deleteCategory: {
      message: 'Categoría eliminada',
    }
  },
  alert: {
    createCategory: {
      header: 'Crear categoría',
      input: {
        name: 'category',
        placeholder: 'Categoría',
        attributes: {
          maxlength: 20,
        },
      },
      buttons: {
        cancel: 'Cancelar',
        accept: 'Crear'
      }
    },
    editCategory: {
      header: 'Editar categoría',
      input: {
        name: 'category',
        placeholder: 'Categoría',
        attributes: {
          maxlength: 20,
        },
      },
      buttons: {
        cancel: 'Cancelar',
        accept: 'Editar'
      }
    },
    deleteCategory: {
      header: 'Eliminar categoría',
      message: '¿Está seguro que desea eliminar la categoría?',
      buttons: {
        cancel: 'No',
        accept: 'Si'
      }
    }
  },
  texts: {
    title: 'Gestionar categorías',
    emptyCategories: 'Aún no hay categorías creadas',
  }
});
