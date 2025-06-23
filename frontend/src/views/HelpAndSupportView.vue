<template>
  <div class="faq-page">
    <section class="frequent-questions">
      <h2>Frequently Asked Questions</h2>
      <div
        class="accordion-item"
        v-for="(faq, index) in faqs"
        :key="index"
      >
        <div class="accordion-header" @click="toggle(index)">
          <span>{{ faq.question }}</span>
          <span class="arrow" :class="{ open: openIndex === index }">▼</span>
        </div>

        <transition name="fade">
          <div class="accordion-body" v-show="openIndex === index">
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </section>

    <section class="contact">
      <h2>Contact</h2>
      <p>Need to get in touch? Reach us via email or phone.</p>
      <div class="button-group">
        <button>Email</button>
        <button>Phone</button>
      </div>
    </section>

    <section class="community">
      <h2>Community</h2>
      <p>Connect with customers and experts in our community forum.</p>
      <div class="button-group">
        <button>Visit Forums</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How to return an item?',
    answer: 'Go to your orders, select the item, and click "Return".',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept Esewa, Khalti, PhonePay, and more.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days.',
  },
]

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.faq-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
}

section {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.accordion-item + .accordion-item {
  margin-top: 0.5rem;
}

.accordion-header {
  background-color: #e6e6e6;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.3s;
}

.accordion-header:hover {
  background-color: #dcdcdc;
}

.accordion-body {
  padding: 0.75rem 1rem;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 0.5rem;
  color: #444;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

/* Buttons */
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
}

button {
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c6c6c6;
}

p {
  font-weight: 500;
  color: #444;
}

/* Transition styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
  }
}
</style>
