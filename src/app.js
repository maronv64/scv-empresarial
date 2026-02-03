/**
 * TaskManager - Gestión de Tareas
 * Práctica CI/CD - MDW101
 */
// función mejorada

class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    /**
     * Agrega una nueva tarea
     * @param {string} title - Título de la tarea
     * @param {string} priority - Prioridad: alta, media, baja
     * @returns {object} - La tarea creada
     */
    addTask(title, priority = 'media') {
        const task = {
            id: this.nextId++,
            title: title,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(task);
        return task;
    }

    /**
     * Marca una tarea como completada
     * @param {number} id - ID de la tarea
     * @returns {boolean} - true si se completó exitosamente
     */
    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            task.completedAt = new Date().toISOString();
            return true;
        }
        return false;
    }

    /**
     * Obtiene todas las tareas pendientes
     * @returns {array} - Lista de tareas pendientes
     */
    getPendingTasks() {
        return this.tasks.filter(t => !t.completed);
    }

    /**
     * Obtiene estadísticas de las tareas
     * @returns {object} - Estadísticas
     */
    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? (completed / total * 100).toFixed(1) : 0
        };
    }
}

module.exports = TaskManager;

// Ejemplo de uso
if (require.main === module) {
    const manager = new TaskManager();
    
    manager.addTask('Configurar Git Hooks', 'alta');
    manager.addTask('Crear GitHub Actions', 'alta');
    manager.addTask('Implementar SemVer', 'media');
    
    console.log('Tareas creadas:', manager.tasks.length);
    console.log('Estadísticas:', manager.getStats());
}
