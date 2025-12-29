
        (function () {
            const passwordInput = document.getElementById('password-input');
            const confirmInput = document.getElementById('confirm-password-input');
            const passwordRulesList = document.getElementById('password-rules');
            const strengthWrapper = document.getElementById('password-strength-wrapper');
            const strengthBar = document.getElementById('password-strength-bar');
            const confirmHint = document.getElementById('confirm-hint');

            const passwordToggle = document.getElementById('password-toggle');
            const confirmPasswordToggle = document.getElementById('confirm-password-toggle');

            const form = document.getElementById('reset-form');
            const submitBtn = document.getElementById('submit-btn');

            if (!passwordInput || !confirmInput || !form || !submitBtn) return;

            // ---- PASSWORD HELPERS ----

            function evaluatePassword(value) {
                return [
                    {
                        id: 'length',
                        ok: value.length >= 8,
                        message: 'Password must be a minimum of 8 characters'
                    },
                    {
                        id: 'uppercase',
                        ok: /[A-Z]/.test(value),
                        message: 'Password must contain a capital letter'
                    },
                    {
                        id: 'lowercase',
                        ok: /[a-z]/.test(value),
                        message: 'Password must contain a small letter'
                    },
                    {
                        id: 'number',
                        ok: /\d/.test(value),
                        message: 'Password must contain a number'
                    },
                    {
                        id: 'special',
                        ok: /[@$!%*?&._#^+=-]/.test(value),
                        message: 'Password must contain a special character'
                    },
                    {
                        id: 'spaces',
                        ok: !/\s/.test(value),
                        message: 'Password must not contain spaces'
                    }
                ];
            }

            function updateStrengthBar(checks, value) {
                if (!strengthWrapper || !strengthBar) return;

                if (!value) {
                    strengthWrapper.classList.add('hidden');
                    strengthBar.style.width = '0%';
                    strengthBar.className = 'h-full w-0 rounded-full bg-red-500 transition-all duration-200';
                    return;
                }

                strengthWrapper.classList.remove('hidden');

                const total = checks.length;
                const passed = checks.filter(c => c.ok).length;
                const percent = (passed / total) * 100;

                strengthBar.style.width = percent + '%';

                if (percent < 40) {
                    strengthBar.className = 'h-full rounded-full bg-red-500 transition-all duration-200';
                } else if (percent < 80) {
                    strengthBar.className = 'h-full rounded-full bg-amber-400 transition-all duration-200';
                } else {
                    strengthBar.className = 'h-full rounded-full bg-emerald-400 transition-all duration-200';
                }
            }

            function updatePasswordRules() {
                if (!passwordInput || !passwordRulesList) return;

                const value = passwordInput.value;
                passwordRulesList.innerHTML = '';

                if (!value) {
                    passwordRulesList.classList.add('hidden');
                    updateStrengthBar([], value);
                    return;
                }

                const checks = evaluatePassword(value);
                const failing = checks.filter(c => !c.ok);

                if (failing.length === 0) {
                    passwordRulesList.classList.add('hidden');
                } else {
                    passwordRulesList.classList.remove('hidden');
                    failing.forEach(rule => {
                        const li = document.createElement('li');
                        li.textContent = rule.message;
                        li.className = 'text-[11px] text-red-400';
                        passwordRulesList.appendChild(li);
                    });
                }

                updateStrengthBar(checks, value);
            }

            function updateConfirm() {
                if (!confirmInput || !confirmHint || !passwordInput) return;

                const pwd = passwordInput.value;
                const confirm = confirmInput.value;

                if (!confirm) {
                    confirmHint.textContent = 'Repeat the same password to confirm.';
                    confirmHint.className = 'mt-1 text-[11px] text-slate-400';
                    confirmInput.className =
                        'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500';
                    return;
                }

                if (pwd === confirm) {
                    confirmHint.textContent = 'Passwords match ✓';
                    confirmHint.className = 'mt-1 text-[11px] text-emerald-400';
                    confirmInput.className =
                        'w-full rounded-xl border border-emerald-500 bg-white px-3 py-2 pr-10 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-50';
                } else {
                    confirmHint.textContent = 'Passwords do not match.';
                    confirmHint.className = 'mt-1 text-[11px] text-red-400';
                    confirmInput.className =
                        'w-full rounded-xl border border-red-500 bg-white px-3 py-2 pr-10 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-50';
                }
            }

            function attachToggle(button, input) {
                if (!button || !input) return;

                button.addEventListener('click', function () {
                    const isPassword = input.type === 'password';
                    input.type = isPassword ? 'text' : 'password';
                    button.textContent = isPassword ? 'Hide' : 'Show';
                });
            }

            // Wire events
            passwordInput.addEventListener('input', function () {
                updatePasswordRules();
                updateConfirm();
            });

            confirmInput.addEventListener('input', updateConfirm);

            attachToggle(passwordToggle, passwordInput);
            attachToggle(confirmPasswordToggle, confirmInput);

            // Initial state
            if (passwordRulesList) passwordRulesList.classList.add('hidden');
            if (strengthWrapper) strengthWrapper.classList.add('hidden');

            // Prevent double-submit + show spinner
            form.addEventListener('submit', function (e) {
                const pwd = passwordInput.value.trim();
                const confirm = confirmInput.value.trim();

                // Simple client-side sanity check
                if (!pwd || !confirm || pwd !== confirm) {
                    e.preventDefault();
                    updatePasswordRules();
                    updateConfirm();
                    return;
                }

                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

                submitBtn.innerHTML = `
                    <span class="inline-flex items-center gap-2">
                        <span class="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black"></span>
                        <span>Resetting password...</span>
                    </span>`;
            });
        })();
