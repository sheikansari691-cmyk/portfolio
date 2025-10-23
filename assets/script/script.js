
        const textElement = document.getElementById('typed-text');
        const textToType = 'UI/UX DESIGNER';
        let charIndex = 0;
        const typingSpeed = 100;

        function type() {
            if (charIndex < textToType.length) {
                textElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                document.querySelector('.cursor').style.animation = 'blink 0.7s infinite';
            }
        }

        document.addEventListener('DOMContentLoaded', type);


        const skills = document.querySelectorAll('.skill');
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.5 // trigger when 50% of the item is visible
        };

        const animateSkills = (entries, observer) => {
            entries.forEach(entry => {
                // Check if the skills section is currently visible
                if (entry.isIntersecting) {
                    const skillElement = entry.target;

                    // Prevent animation from running multiple times
                    if (skillElement.classList.contains('animated')) {
                        return;
                    }
                    skillElement.classList.add('animated'); // Mark as animated

                    // 1. Get the target percentage
                    const targetPercentage = parseInt(skillElement.getAttribute('data-percentage'));

                    // 2. Calculate the required stroke-dashoffset for the ring animation
                    // Formula: Circumference (C) ≈ 440 (for r=70)
                    // Dashoffset = C - (C * percentage / 100)
                    const circumference = 440;
                    const dashoffset = circumference - (circumference * targetPercentage / 100);

                    // 3. Apply the ring animation (CSS transition handles the movement)
                    skillElement.style.setProperty('--dashoffset', dashoffset);
                    skillElement.classList.add('animate');

                    // 4. Run the number counting animation
                    const percentageSpan = skillElement.querySelector('.percentage');
                    let start = 0;
                    const duration = 1500; // 1.5 seconds for the count up
                    const step = Math.ceil(duration / targetPercentage);

                    const counter = setInterval(() => {
                        start++;
                        percentageSpan.textContent = start + '%';

                        if (start === targetPercentage) {
                            clearInterval(counter);
                        }
                    }, step);

                    // Stop observing after the animation has been triggered once
                    observer.unobserve(skillElement);
                }
            });
        };

        // Create the observer and attach it to each skill
        const observer = new IntersectionObserver(animateSkills, observerOptions);

        skills.forEach(skill => {
            observer.observe(skill);
        });