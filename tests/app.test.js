/**
 * Tests unitarios para TaskManager
 * Práctica CI/CD - MDW101
 */

const TaskManager = require('../src/app');

console.log('=================================');
console.log('  Ejecutando Tests Unitarios');
console.log('=================================\n');

let passed = 0;
let failed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`✅ ${description}`);
        passed++;
    } catch (error) {
        console.log(`❌ ${description}`);
        console.log(`   Error: ${error.message}`);
        failed++;
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}: esperado ${expected}, obtenido ${actual}`);
    }
}

// Tests
const manager = new TaskManager();

test('Crear instancia de TaskManager', () => {
    assertEqual(manager.tasks.length, 0, 'Debe iniciar sin tareas');
});

test('Agregar una tarea', () => {
    const task = manager.addTask('Test task', 'alta');
    assertEqual(task.title, 'Test task', 'Título debe coincidir');
    assertEqual(task.priority, 'alta', 'Prioridad debe coincidir');
    assertEqual(task.completed, false, 'Debe iniciar sin completar');
});

test('Completar una tarea', () => {
    const result = manager.completeTask(1);
    assertEqual(result, true, 'Debe retornar true');
});

test('Obtener estadísticas', () => {
    const stats = manager.getStats();
    assertEqual(stats.total, 1, 'Total debe ser 1');
    assertEqual(stats.completed, 1, 'Completadas debe ser 1');
});

test('Agregar múltiples tareas', () => {
    manager.addTask('Tarea 2', 'media');
    manager.addTask('Tarea 3', 'baja');
    assertEqual(manager.tasks.length, 3, 'Debe haber 3 tareas');
});

test('Obtener tareas pendientes', () => {
    const pending = manager.getPendingTasks();
    assertEqual(pending.length, 2, 'Debe haber 2 pendientes');
});

// Resumen
console.log('\n=================================');
console.log(`  Resultados: ${passed} pasaron, ${failed} fallaron`);
console.log('=================================');

process.exit(failed > 0 ? 1 : 0);
