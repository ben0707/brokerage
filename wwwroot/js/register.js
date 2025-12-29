
        (function () {
            const emailInput = document.getElementById('email-input');
            const emailHint = document.getElementById('email-hint');

            const passwordInput = document.getElementById('password-input');
            const confirmInput = document.getElementById('confirm-password-input');
            const passwordRulesList = document.getElementById('password-rules');
            const strengthWrapper = document.getElementById('password-strength-wrapper');
            const strengthBar = document.getElementById('password-strength-bar');
            const confirmHint = document.getElementById('confirm-hint');

            const passwordToggle = document.getElementById('password-toggle');
            const confirmPasswordToggle = document.getElementById('confirm-password-toggle');

            // Basic email regex (no spaces, simple format)
            const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

            // Base classes for inputs (light + dark, neutral)
            const INPUT_NEUTRAL =
                'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ' +
                'text-slate-900 shadow-sm placeholder:text-slate-400 ' +
                'focus:border-brandGold focus:outline-none focus:ring-1 focus:ring-brandGold ' +
                'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500';

            const INPUT_VALID =
                'w-full rounded-lg border border-emerald-500 bg-white px-3 py-2 text-sm ' +
                'text-slate-900 shadow-sm placeholder:text-slate-400 ' +
                'focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 ' +
                'dark:border-emerald-500 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500';

            const INPUT_INVALID =
                'w-full rounded-lg border border-red-500 bg-white px-3 py-2 text-sm ' +
                'text-slate-900 shadow-sm placeholder:text-slate-400 ' +
                'focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 ' +
                'dark:border-red-500 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500';

            const INPUT_NEUTRAL_WITH_TOGGLE =
                INPUT_NEUTRAL + ' pr-14';
            const INPUT_VALID_WITH_TOGGLE =
                INPUT_VALID + ' pr-14';
            const INPUT_INVALID_WITH_TOGGLE =
                INPUT_INVALID + ' pr-14';

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
                    // Hide bar when no input
                    strengthWrapper.classList.add('hidden');
                    strengthBar.style.width = '0%';
                    strengthBar.className =
                        'h-full w-0 rounded-full bg-red-500 transition-all duration-200';
                    return;
                }

                strengthWrapper.classList.remove('hidden');

                const total = checks.length;
                const passed = checks.filter(c => c.ok).length;
                const percent = (passed / total) * 100;

                strengthBar.style.width = percent + '%';

                if (percent < 40) {
                    strengthBar.className =
                        'h-full rounded-full bg-red-500 transition-all duration-200';
                } else if (percent < 80) {
                    strengthBar.className =
                        'h-full rounded-full bg-amber-400 transition-all duration-200';
                } else {
                    strengthBar.className =
                        'h-full rounded-full bg-emerald-400 transition-all duration-200';
                }
            }

            function updatePasswordRules() {
                if (!passwordInput || !passwordRulesList) return;

                const value = passwordInput.value;
                passwordRulesList.innerHTML = '';

                if (!value) {
                    passwordRulesList.classList.add('hidden');
                    updateStrengthBar([], value);
                    passwordInput.className = INPUT_NEUTRAL_WITH_TOGGLE;
                    return;
                }

                const checks = evaluatePassword(value);
                const failing = checks.filter(c => !c.ok);

                if (failing.length === 0) {
                    passwordRulesList.classList.add('hidden');
                    passwordInput.className = INPUT_VALID_WITH_TOGGLE;
                } else {
                    passwordRulesList.classList.remove('hidden');
                    passwordInput.className = INPUT_INVALID_WITH_TOGGLE;

                    failing.forEach(rule => {
                        const li = document.createElement('li');
                        li.textContent = rule.message;
                        li.className = 'text-[11px] text-red-500';
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
                    confirmInput.className = INPUT_NEUTRAL_WITH_TOGGLE;
                    return;
                }

                if (pwd === confirm) {
                    confirmHint.textContent = 'Passwords match ✓';
                    confirmHint.className = 'mt-1 text-[11px] text-emerald-500';
                    confirmInput.className = INPUT_VALID_WITH_TOGGLE;
                } else {
                    confirmHint.textContent = 'Passwords do not match.';
                    confirmHint.className = 'mt-1 text-[11px] text-red-500';
                    confirmInput.className = INPUT_INVALID_WITH_TOGGLE;
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

            // ---- EMAIL ----

            function updateEmail() {
                if (!emailInput || !emailHint) return;

                const value = emailInput.value;

                if (!value) {
                    emailHint.textContent = '';
                    emailHint.className = 'mt-1 hidden text-[11px] text-slate-400';
                    emailInput.className = INPUT_NEUTRAL;
                    return;
                }

                emailHint.classList.remove('hidden');

                if (emailRegex.test(value)) {
                    emailHint.textContent = '';
                    emailHint.className = 'mt-1 text-[11px] text-emerald-500';
                    emailInput.className = INPUT_VALID;
                } else {
                    emailHint.textContent =
                        'Please enter a valid email address (no spaces, include @ and domain).';
                    emailHint.className = 'mt-1 text-[11px] text-red-500';
                    emailInput.className = INPUT_INVALID;
                }
            }

            // ---- WIRE EVENTS ----

            if (emailInput) {
                emailInput.addEventListener('input', updateEmail);
            }

            if (passwordInput) {
                // initialize base
                passwordInput.className = INPUT_NEUTRAL_WITH_TOGGLE;

                passwordInput.addEventListener('input', function () {
                    updatePasswordRules();
                    updateConfirm();
                });
            }

            if (confirmInput) {
                confirmInput.className = INPUT_NEUTRAL_WITH_TOGGLE;
                confirmInput.addEventListener('input', updateConfirm);
            }

            attachToggle(passwordToggle, passwordInput);
            attachToggle(confirmPasswordToggle, confirmInput);

            if (passwordRulesList) passwordRulesList.classList.add('hidden');
            if (strengthWrapper) strengthWrapper.classList.add('hidden');

              const registerForm = document.querySelector('form[asp-action="Register"]');
        const submitBtn = document.getElementById('register-submit');
        const submitLabel = document.getElementById('register-submit-label');
        const submitSpinner = document.getElementById('register-submit-spinner');

        if (registerForm && submitBtn && submitLabel && submitSpinner) {
            registerForm.addEventListener('submit', function () {
                // Already submitting? Just let the browser continue.
                if (submitBtn.dataset.submitting === 'true') {
                    return;
                }

                // Mark as submitting & lock button
                submitBtn.dataset.submitting = 'true';
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

                // Update UI to loading state
                submitLabel.textContent = 'Loading...';
                submitSpinner.classList.remove('hidden');
            });
        }
        })();
