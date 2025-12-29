
        (function () {
            const form = document.getElementById('forgot-form');
            const submitBtn = document.getElementById('submit-btn');
            const emailInput = document.getElementById('email-input');
            const emailHint = document.getElementById('email-hint');

            if (!form || !submitBtn || !emailInput || !emailHint) return;

            const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

            function validateEmail() {
                const value = emailInput.value.trim();

                if (!value) {
                    emailHint.textContent = '';
                    emailHint.classList.add('hidden');
                    emailInput.className =
                        'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500';
                    return false;
                }

                emailHint.classList.remove('hidden');

                if (emailRegex.test(value)) {
                    emailHint.textContent = '';
                    emailHint.className = 'mt-1 text-[11px] text-emerald-400';
                    emailInput.className =
                        'w-full rounded-xl border border-emerald-500 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:bg-slate-900 dark:text-slate-50';
                    return true;
                } else {
                    emailHint.textContent = 'Please enter a valid email address (no spaces, include @ and domain).';
                    emailHint.className = 'mt-1 text-[11px] text-red-400';
                    emailInput.className =
                        'w-full rounded-xl border border-red-500 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-slate-900 dark:text-slate-50';
                    return false;
                }
            }

            emailInput.addEventListener('input', validateEmail);

            form.addEventListener('submit', function (e) {
                const valid = validateEmail();
                if (!valid) {
                    e.preventDefault();
                    return;
                }

                // Prevent double-submit
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

                submitBtn.innerHTML = `
                        <span class="inline-flex items-center gap-2">
                            <span class="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black"></span>
                            <span>Sending reset link...</span>
                        </span>`;
            });
        })();
