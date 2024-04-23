---
title: "Dynmic Form"
---

<div class="row not-prose mb-4">
  <div class="col-lg-6 mx-auto">
    {{< form background="#1D1F26" style="rounded-boxed" conditional-form=true >}}
      {{< input-text label="Your Name" id="name" name="name" placeholder="muhammad sumon" >}}
      {{< input-text label="Email" id="email" name="name" placeholder="muhammad@gmail.com" >}}
      {{< input-check-group title="Reason For Contacting" >}}
        {{< input-check label="Question" type="radio" id="question" name="reason" condition="checked:specificQuestion" >}}
        {{< input-check label="Feedback" type="radio" id="feedback" name="reason" condition="checked:feedbackInput" >}}
        {{< input-check label="Other" label_class="mb-0" type="radio" id="other" name="reason" >}}
      {{< /input-check-group >}}
      {{< input-text label="Specific Question" id="specificQuestion" name="question" placeholder="Trying a sentence with 'located' or 'faq'" condition="match/located:location" conditional-element=true >}}
      {{< note value="we are located at Milky Way" id="location" conditional-element=true >}}
      {{< note value="yes, we have a [faq page](/faq/)" conditional="specificQuestion:match/faq" id="faq" conditional-element=true >}}
      {{< input-textarea label="Feedback" id="feedbackInput" name="feedback" placeholder="your message" conditional="feedback:checked" conditional-element=true >}}
    {{< /form >}}
  </div>
</div>

<br/>

### Feedback Form {.text-center}

<div class="row not-prose">
  <div class="col-lg-6 mx-auto">
    {{< form background="#1D1F26" style="rounded-boxed" conditional-form=true >}}
      {{< input-check-group title="###### How would you rate your experience with us?" >}}
        {{< input-check label="Bad" type="radio" id="bad" name="experience" condition="checked:negative">}}
        {{< input-check label="Fair" type="radio" id="fair" name="experience" condition="checked:negative">}}
        {{< input-check label="Good" type="radio" id="good" name="experience" condition="checked:positive" >}}
        {{< input-check label="Very good" type="radio" id="veryGood" name="experience" >}}
        {{< input-check label="Excellent" type="radio" id="excellent" name="experience" condition="checked:testimonial-propose" >}}
      {{< /input-check-group >}}
      {{< input-text label="We're sorry to hear you had a bad experience. What went wrong?" id="negative" name="feedback" placeholder="" conditional-element=true >}}
      {{< input-text label="Please tell us what you liked and how we can improve:" id="positive" name="feedback" placeholder="" conditional-element=true >}}

      {{< input-check-group title="Wonderful! We're so glad to hear that. Would you be willing to write a customer comment for our website?" id="testimonial-propose" conditional-element=true >}}
        {{< input-check label="Sure!" type="radio" id="want-to-comment" name="write-a-comment" condition="checked:specificQuestion" >}}
        {{< input-check label="I'd rather not." type="radio" id="dont-want-to-comment" name="write-a-comment" condition="checked:specificQuestion" >}}
      {{< /input-check-group >}}

      {{< input-textarea label="Thank you so much! Please leave your testimonial here:" id="leave-a-comment" name="customer-comment" conditional-element=true >}}

      {{< note value="No problem, thanks for being a customer!" id="don't-want-to-comment" conditional-element=true >}}
    {{< /form >}}
  </div>
</div>
