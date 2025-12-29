(function () {

    // ----------- ELEMENTS -----------
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email-input');
    const emailHint = document.getElementById('email-hint');
    const passwordInput = document.getElementById('password-input');
    const passwordToggle = document.getElementById('password-toggle');
    const submitBtn = document.getElementById('login-submit');

    if (!form || !emailInput || !passwordInput || !submitBtn) return;

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;


    // ----------------------------------------------------
    //                    EMAIL VALIDATION
    // ----------------------------------------------------
    function validateEmail() {
        const value = emailInput.value.trim();

        if (!value) {
            emailHint.textContent = '';
            emailHint.classList.add('hidden');
            resetEmailInputStyle();
            return false;
        }

        emailHint.classList.remove('hidden');

        if (emailRegex.test(value)) {
            emailHint.textContent = '';
            emailHint.className = 'mt-1 text-[11px] text-emerald-400';
            emailInput.className =
                baseInputClass() +
                ' border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500';
            return true;
        }

        // Invalid
        emailHint.textContent = "Enter a valid email address. (No spaces, must contain @ and domain.)";
        emailHint.className = 'mt-1 text-[11px] text-red-400';
        emailInput.className =
            baseInputClass() +
            ' border-red-500 focus:border-red-500 focus:ring-red-500';

        return false;
    }


    function resetEmailInputStyle() {
        emailInput.className = baseInputClass();
    }


    // ----------------------------------------------------
    //             PASSWORD SHOW/HIDE TOGGLE
    // ----------------------------------------------------
    if (passwordToggle) {
        passwordToggle.addEventListener('click', () => {
            const isPwd = passwordInput.type === 'password';
            passwordInput.type = isPwd ? 'text' : 'password';
            passwordToggle.textContent = isPwd ? 'Hide' : 'Show';
        });
    }


    // ----------------------------------------------------
    //                FORM SUBMIT HANDLER
    // ----------------------------------------------------
    form.addEventListener('submit', function (e) {

        const emailOK = validateEmail();
        const pwdOK = passwordInput.value.trim().length > 0;

        if (!emailOK || !pwdOK) {
            e.preventDefault();

            // Red highlight for empty password
            if (!pwdOK) {
                passwordInput.className =
                    baseInputClass() +
                    ' border-red-500 focus:border-red-500 focus:ring-red-500';
            }

            return;
        }

        // Prevent double submit
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-60", "cursor-not-allowed");

        submitBtn.innerHTML = `
            <span class="inline-flex items-center gap-2">
                <span class="h-4 w-4 animate-spin rounded-full border-2 
                             border-black/30 border-t-black dark:border-white/30 dark:border-t-white"></span>
                <span>Signing in...</span>
            </span>`;
    });


    // ----------------------------------------------------
    //             LIVE EMAIL VALIDATION
    // ----------------------------------------------------
    emailInput.addEventListener('input', validateEmail);


    // ----------------------------------------------------
    //          BASE INPUT CLASS (for consistency)
    // ----------------------------------------------------
    function baseInputClass() {
        return `
            w-full rounded-xl border px-3 py-2 text-sm
            placeholder:text-slate-400
            focus:outline-none focus:ring-1
            bg-white text-slate-900
            dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500
            dark:border-slate-700
        `;
    }

})();
