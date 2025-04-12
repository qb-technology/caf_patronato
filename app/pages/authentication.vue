<script lang="ts" setup>
  import * as z from 'zod';
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { tv } from 'tailwind-variants';

  definePageMeta({
    layout: 'canvas',
  });

  const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string(),
  });

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined,
  });

  const toast = useToast();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({
      title: 'Success',
      description: 'The form has been submitted.',
      color: 'success',
    });
    console.log(event.data);
  }

  const page = tv({
    slots: {
      root: 'w-full space-y-6',
      header: 'flex flex-col text-center',
      leading: 'mb-2',
      leadingIcon: 'size-8 shrink-0',
      title: 'text-xl text-pretty font-semibold text-(--ui-text-highlighted)',
      description: 'mt-1 text-base text-pretty text-(--ui-text-muted)',
      body: 'gap-y-6 flex flex-col',
      providers: 'space-y-3',
      separator: '',
      form: 'space-y-5',
      footer: 'text-sm text-center text-(--ui-text-muted) mt-2',
    },
  });
  const ui = page();

  const show = ref(false);
</script>

<template>
  <UContainer class="h-screen overflow-hidden grid place-content-center">
    <div :class="ui.root({ class: 'w-full sm:w-[500px]' })">
      <div class="flex items-center justify-center" :class="ui.header()">
        <UButton color="neutral" variant="ghost">
          <template #leading>
            <UIcon name="i-qb:logo" class="size-20" />
          </template>
        </UButton>

        <h1 :class="ui.title()">Login</h1>
        <p :class="ui.description()">
          Enter your credentials to access your account
        </p>
      </div>

      <div :class="ui.body()">
        <UForm
          :schema="schema"
          :state="state"
          :class="ui.form()"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput v-model="state.email" placeholder="Email..." />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
              placeholder="password"
              :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </UFormField>

          <UButton type="submit" block>Submit</UButton>
        </UForm>
      </div>
    </div>
  </UContainer>
</template>

<style scoped></style>
