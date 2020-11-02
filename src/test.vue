<template>
<div>
  <b-form-group
      id="form-group-dob"
      label-for="dob"
      label="Date of Birth: "
  >
    <b-input-group class="mb-3" id="dob">
      <b-form-input
          id="dobText"
          v-model="formData.dob"
          type="text"
          placeholder="YYYY-MM-DD"
          :state="dobState"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
            id="dobPicker"
            aria-controls="dobText"
            button-only
            right
            v-model="formData.dob"
            :date-format-options="{day:'numeric',month: 'numeric',year:'numeric' }"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
</div>
</template>

<script>
export default {
name: "test"
}
</script>

<style scoped>

</style>
