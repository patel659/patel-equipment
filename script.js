let selectedRating = 0;


/* ================================
   STAR RATING
================================ */

const ratingButtons =
    document.querySelectorAll(
        "#ratingInput button"
    );


const ratingHelp =
    document.getElementById("ratingHelp");


ratingButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedRating =
            Number(button.dataset.rating);

        updateStarSelector();

        ratingHelp.textContent =
            `${selectedRating} out of 5 stars selected`;

    });

});


function updateStarSelector() {

    ratingButtons.forEach(button => {

        const rating =
            Number(button.dataset.rating);

        button.textContent =
            rating <= selectedRating
                ? "?"
                : "?";

    });

}


/* ================================
   CHARACTER COUNT
================================ */

const reviewText =
    document.getElementById("reviewText");

const characterCount =
    document.getElementById("characterCount");


reviewText.addEventListener("input", () => {

    characterCount.textContent =
        reviewText.value.length;

});


/* ================================
   FORM SUBMISSION
================================ */

const reviewForm =
    document.getElementById("reviewForm");


reviewForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("customerName")
                .value
                .trim();


        const text =
            reviewText
                .value
                .trim();


        if (selectedRating === 0) {

            alert(
                "Please select a rating before submitting."
            );

            return;
        }


        if (!name || !text) {

            alert(
                "Please fill in all required fields."
            );

            return;
        }


        const review = {

            id: Date.now(),

            name: name,

            rating: selectedRating,

            text: text,

            date:
                new Date()
                    .toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    )

        };


        addReview(review);


        reviewForm.reset();


        selectedRating = 0;

        updateStarSelector();


        ratingHelp.textContent =
            "Select your rating";


        characterCount.textContent =
            "0";


        alert(
            "Thank you! Your review has been submitted."
        );


        document
            .getElementById("reviewsList")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


/* ================================
   ADD REVIEW TO PAGE
================================ */

function addReview(review) {

    const reviewsList =
        document.getElementById(
            "reviewsList"
        );


    const emptyState =
        document.getElementById(
            "emptyState"
        );


    if (emptyState) {
        emptyState.remove();
    }


    const card =
        document.createElement("article");


    card.className =
        "review-card";


    const avatar =
        getInitials(review.name);


    const stars =
        "?".repeat(review.rating) +
        "?".repeat(5 - review.rating);


    card.innerHTML = `

        <div class="review-header">

            <div class="customer-avatar">
                ${escapeHTML(avatar)}
            </div>


            <div class="customer-details">

                <div class="customer-name">

                    ${escapeHTML(review.name)}

                    <span class="verified">
                        ? Verified
                    </span>

                </div>


                <div class="review-date">
                    ${escapeHTML(review.date)}
                </div>

            </div>

        </div>


        <div class="review-stars">
            ${stars}
        </div>


        <p class="review-text">
            ${escapeHTML(review.text)}
        </p>

    `;


    reviewsList.prepend(card);


    updateAverageRating();

}


/* ================================
   INITIALS
================================ */

function getInitials(name) {

    const words =
        name
            .trim()
            .split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}


/* ================================
   AVERAGE RATING
================================ */

function updateAverageRating() {

    const reviews =
        document.querySelectorAll(
            ".review-card"
        );


    if (reviews.length === 0) {

        document
            .getElementById("averageRating")
            .textContent = "0.0";

        document
            .getElementById("reviewCount")
            .textContent = "0";

        document
            .getElementById("averageStars")
            .textContent = "?????";

        return;
    }


    let total = 0;


    reviews.forEach(review => {

        const stars =
            review.querySelector(
                ".review-stars"
            ).textContent;


        total +=
            (stars.match(/?/g) || [])
                .length;

    });


    const average =
        total / reviews.length;


    document
        .getElementById("averageRating")
        .textContent =
            average.toFixed(1);


    document
        .getElementById("reviewCount")
        .textContent =
            reviews.length;


    const rounded =
        Math.round(average);


    document
        .getElementById("averageStars")
        .textContent =
            "?".repeat(rounded) +
            "?".repeat(5 - rounded);

}


/* ================================
   SECURITY
================================ */

function escapeHTML(value) {

    const element =
        document.createElement("div");


    element.textContent =
        value;


    return element.innerHTML;

}
