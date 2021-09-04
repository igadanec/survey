<template>
  <div class="container">
    <div class="container__inner">
      <h1>Thank you for completing the survey</h1>
      <div class="survey">
        <div
          class="completed-survey"
          v-for="question in completedSurvey"
          :key="question.questionId"
        >
          <h3>Question: {{ question.label }}</h3>
          <p>Answer: {{ question.answer }}</p>
        </div>
      </div>
      <div class="button-container">
        <router-link to="/" class="btn btn-3 hover-border-1">
          <span>Go to homepage</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: [
        {
          questionId: "film",
          questionType: "text",
          label: "What film did you watch?",
          required: true,
          attributes: null,
          answer: "test",
        },
        {
          questionId: "review",
          questionType: "rating",
          label: "How would you rate the film? (1 - Very bad, 5 - Very good)",
          required: true,
          attributes: {
            min: 1,
            max: 5,
          },
          answer: "5",
        },
      ],
    };
  },
  beforeCreate() {
    // Check store if survey is subbmitted
    if (!this.$store.state.submittedSurvey) {
      this.$router.go(-1);
    }
  },
  computed: {
    completedSurvey() {
      return this.$store.state.submittedSurvey;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20px;
  background-color: #24273d;
  height: 100vh;
  &__inner {
    color: #edede3;
    padding: 100px 0;
    h1 {
      margin-bottom: 60px;
      text-align: center;
      color: #fb5d56;
    }
    .survey {
      width: fit-content;
      max-width: 700px;
      margin: 0 auto;
    }
    .completed-survey {
      margin-bottom: 32px;
      h3 {
        margin-bottom: 10px;
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
</style>
