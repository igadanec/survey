<template>
  <div class="container">
    <div class="container__inner" v-if="surveys && surveys.attributes">
      <div class="container__inner--left">
        <img src="@/static/images/cover.jpg" alt="cover" />
        <div class="image-overflow" />
      </div>
      <div class="container__inner--right">
        <div class="form">
          <h1>{{ surveys.attributes.title }}</h1>
          <div class="desc" v-html="surveys.attributes.description" />
          <form class="form-survey">
            <div
              class="form-survey__item"
              v-for="question in surveys.attributes.questions"
              :key="question.questionId"
            >
              <label :for="question.questionId">{{ question.label }}</label>
              <input
                :class="{ filled: question.answer && question.answer.length }"
                :id="question.questionId"
                type="text"
                v-model="question.answer"
                :placeholder="
                  question.questionId === 'review'
                    ? 'Please enter film rating'
                    : 'Please enter film name'
                "
                :maxlength="question.questionId === 'review' ? 1 : 124"
                @keypress="isNumber($event, question.questionId)"
              />
            </div>
          </form>
          <div class="button-container">
            <button @click="submitForm" class="btn btn-3 hover-border-1">
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      surveys: [],
    };
  },
  created() {
    this.getSurvey();
  },
  methods: {
    async getSurvey() {
      await this.axios
        .get("http://localhost:3000/api/v1/survey")
        .then(({ data }) => {
          this.surveys = data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      // map answers for payload
      let mappedAnswers = this.surveys.attributes.questions.map((obj) => {
        let answer = {
          questionId: obj.questionId || "",
          answer: obj.answer || "",
        };
        return answer;
      });
      // validation for answers
      let errors = [];
      for (let i = 0; i < mappedAnswers.length; i++) {
        if (mappedAnswers[i].answer === "") {
          errors.push({
            source: {
              pointer: `data/attributes/answers/${mappedAnswers[i].questionId}`,
            },
            detail: "The value is required",
          });
        }
      }
      let payload = {
        type: "surveyAnswers",
        attributes: {
          answers: mappedAnswers,
        },
      };
      if (!errors.length) {
        this.axios
          .post(
            `http://localhost:3000/api/v1/survey/${this.surveys.id}/answers`,
            payload
          )
          .then(() => {
            this.$store.commit(
              "SET_SUBMITTED_SURVEY",
              this.surveys.attributes.questions
            );
            this.$router.push("/success");
          })
          .catch((err) => {
            this.$toasted.show(err.response.statusText, {
              duration: 2000,
              type: "error",
            });
          });
      } else {
        for (let i = 0; i < mappedAnswers.length; i++) {
          if (errors[i]) {
            let errorField = errors[i].source.pointer.split("/");
            this.$toasted.show(
              `The ${errorField[errorField.length - 1]} field is required`,
              {
                duration: 2000,
                type: "error",
              }
            );
          }
        }
      }
    },
    isNumber(evt, type) {
      if (type === "review") {
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (charCode < 49 || charCode > 53) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  &__inner {
    display: flex;
    &--left {
      @media only screen and (min-width: 768px) {
        width: 50%;
      }
      position: relative;
      img {
        display: block;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        object-position: 20%;
      }
      .image-overflow {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    &--right {
      width: 100%;
      color: #edede3;
      display: flex;
      align-items: center;
      justify-content: center;
      @media only screen and (max-width: 767px) {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      @media only screen and (min-width: 768px) {
        width: 50%;
        box-sizing: border-box;
        padding: 20px;
        background-color: #24273d;
      }
      .form {
        @media only screen and (max-width: 767px) {
          box-sizing: border-box;
          padding: 20px;
          background-color: #24273d;
          border-radius: 4px;
          box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.15);
          margin: 0 15px;
        }
        h1 {
          text-align: center;
          margin-bottom: 24px;
          color: #fb5d56;
        }
        .desc {
          text-align: center;
          ::v-deep p {
            margin-bottom: 16px;
          }
        }
        &-survey {
          margin-top: 60px;
          &__item {
            margin-bottom: 30px;
            label {
              display: block;
              margin-bottom: 12px;
              font-weight: 600;
            }
            input {
              box-sizing: border-box;
              width: 100%;
              border: 1px solid #edede3;
              padding: 10px;
              border-radius: 4px;
              background-color: transparent;
              outline: none;
              color: #edede3;
              transition: 0.3s;
              &:focus {
                border: 1px solid #fb5d56;
              }
              &::placeholder {
                color: #edede3;
              }
              &.filled {
                border: 1px solid #fb5d56;
              }
            }
          }
        }
        .button-container {
          margin-top: 50px;
          text-align: center;
        }
        ::before,
        ::after {
          position: absolute;
          content: "";
        }
        .btn {
          position: relative;
          display: inline-block;
          width: 100%;
          max-width: 150px;
          height: auto;
          background-color: transparent;
          border: none;
          cursor: pointer;
          span {
            width: 100%;
            box-sizing: border-box;
            position: relative;
            display: inline-block;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
            padding: 10px 15px;
            font-family: "Roboto", sans-serif;
            transition: 0.3s;
          }
        }

        /*--- btn-3 ---*/
        .btn-3 {
          padding: 5px;
        }
        .btn-3 span {
          color: #edede3;
          background-color: #fb5d56;
        }
        .btn-3::before,
        .btn-3::after {
          background: transparent;
          z-index: 2;
        }

        /* 11. hover-border-1 */
        .btn.hover-border-1::before,
        .btn.hover-border-1::after {
          width: 10%;
          height: 25%;
          transition: 0.35s;
        }
        .btn.hover-border-1::before {
          top: 0;
          left: 0;
          border-left: 1px solid #fb5d56;
          border-top: 1px solid #fb5d56;
        }
        .btn.hover-border-1::after {
          bottom: 0;
          right: 0;
          border-right: 1px solid #fb5d56;
          border-bottom: 1px solid #fb5d56;
        }
        .btn.hover-border-1:hover::before,
        .btn.hover-border-1:hover::after {
          width: 99%;
          height: 98%;
        }
      }
    }
  }
}
</style>
