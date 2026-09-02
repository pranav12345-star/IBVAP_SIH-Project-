/**
 * IBVAP Toast Notification Service
 */

export function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    let bg = 'bg-primary-container text-white border-outline';
    if (type === 'critical') bg = 'bg-critical-red border-red-700 text-white font-bold';
    if (type === 'warning') bg = 'bg-warning-amber border-amber-600 text-white font-bold';
    if (type === 'success') bg = 'bg-security-green border-green-600 text-white font-bold';

    toast.className = `${bg} border px-4 py-3 rounded shadow-xl font-sans text-xs flex items-center gap-2.5 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto`;
    toast.innerHTML = `
        <span class="material-symbols-outlined text-[18px]">info</span>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}
