<template>
  <div class="container-fluid pb-4">
    <Form @submit="updateDriver" :validation-schema="schema">
      <div class="card w-75 mx-auto">
        <div class="card-header text-center text-capitalize">
          <h6>{{ $t('drivers.forms.create') }}</h6>
        </div>
        <div class="card-body pt-2">
          <div class="row">
            <div class="col-md-6">
              <div class="card-header text-center text-capitalize">
                <h6>{{ $t('drivers.forms.create_driver') }}</h6>
              </div>
              <img v-if="driver.photoUrl" :src="driver.photoUrl" class="card-img-top img-driver" alt="profile_photo">
              <div v-else class="container-fluid text-center">
                <em class="fa-solid fa-user-astronaut fa-10x"></em>
              </div>
              <button class="btn btn-sm btn-info btn-edit-img py-1 px-2" type="button" data-bs-toggle="modal"
                      data-bs-target="#image-driver">
                <span class="btn-inner--icon"><em class="fas fa-pen"></em></span>
              </button>
              <div class="form-group">
                <label>{{ $t('users.fields.name') }}</label>
                <Field name="name" type="text" v-slot="{ field, errorMessage, meta }" v-model="driver.name">
                  <input class="form-control form-control-sm" id="name" aria-label="Name" aria-describedby="name-addon"
                         v-model="field.value" :placeholder="$t('common.placeholders.name')" v-bind="field"/>
                  <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                </Field>
              </div>
              <div class="form-group">
                <label>{{ $t('users.fields.email') }}</label>
                <Field name="email" type="email" v-slot="{ field, errorMessage,meta }" v-model="driver.email">
                  <input class="form-control form-control-sm" id="email" aria-label="Email" aria-describedby="email-addon"
                         v-model="field.value" :placeholder="$t('common.placeholders.email')" v-bind="field"/>
                  <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                </Field>
              </div>
              <div class="form-group">
                <label>{{ $t('users.fields.phone') }}</label>
                <Field name="phone" type="phone" v-slot="{ field, errorMessage, meta }" v-model="driver.phone">
                  <input class="form-control form-control-sm" id="phone" aria-label="Phone" aria-describedby="phone-addon"
                         v-model="field.value" :placeholder="$t('common.placeholders.phone')" v-bind="field"/>
                  <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                </Field>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-3">
                    <label>{{ $t('drivers.fields.doc_type') }}</label>
                    <Field name="docType" class="form-select form-select-sm" id="doc_type" as="select" v-model="driver.docType">
                      <option v-for="(type, key) in types" :key="key" :value="type" selected>{{ type }}</option>
                    </Field>
                  </div>
                  <div class="col-sm-9">
                    <label>{{ $t('drivers.fields.document') }}</label>
                    <Field name="document" type="text" v-slot="{ field, errorMessage, meta }" v-model="driver.document">
                      <input class="form-control form-control-sm" id="document" aria-label="Document" aria-describedby="doc-addon"
                             v-model="field.value" :placeholder="$t('drivers.placeholders.document')" v-bind="field"/>
                      <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input" name="enable" type="checkbox" :checked="driver.isEnabled()"
                       id="flexSwitchCheckDefault" @change="onEnable"/>
                <label class="form-check-label">{{
                    $t(driver.enabled_at ? 'common.fields.enabled' : 'common.fields.disabled')
                  }}</label>
                <ErrorMessage name="enable"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card-header text-center text-capitalize">
                <h6>{{ $t('drivers.forms.create_vehicle') }}</h6>
              </div>
              <img v-if="driver.vehicle.photoUrl" :src="driver.vehicle.photoUrl" class="card-img-top img-driver" alt="profile_photo">
              <div v-else class="container-fluid text-center">
                <em class="fa-solid fa-car-side fa-10x"></em>
              </div>
              <button class="btn btn-sm btn-info btn-edit-img py-1 px-2" type="button" data-bs-toggle="modal"
                      data-bs-target="#image-vehicle">
                <span class="btn-inner--icon"><em class="fas fa-pen"></em></span>
              </button>
              <div class="form-group">
                <label>{{ $t('drivers.vehicle.brand') }}</label>
                <Field name="brand" type="text" v-slot="{ field, errorMessage, meta}" v-model="driver.vehicle.brand">
                  <input class="form-control form-control-sm" id="brand" aria-label="Brand" aria-describedby="brand-addon"
                         v-model="field.value" :placeholder="$t('drivers.placeholders.brand')" v-bind="field"/>
                  <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                </Field>
              </div>
              <div class="form-group">
                <label>{{ $t('drivers.vehicle.model') }}</label>
                <Field name="model" type="text" v-slot="{ field, errorMessage, meta}" v-model="driver.vehicle.model">
                  <input class="form-control form-control-sm" id="model" aria-label="Model" aria-describedby="model-addon"
                         v-model="field.value" :placeholder="$t('drivers.placeholders.model')" v-bind="field"/>
                  <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                </Field>
              </div>
              <div class="form-group">
                <label>{{ $t('drivers.vehicle.plate') }}</label>
                <Field name="plate" type="text" v-model="driver.vehicle.plate" v-slot="{ field, errorMessage, meta }">
                  <input class="form-control form-control-sm" v-model="field.value" :placeholder="$t('drivers.placeholders.plate')" id="plate" aria-label="Plate" aria-describedby="plate-addon" v-bind="field" autocomplete="none"/>
                  <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                </Field>
              </div>
              <div class="row">
                <div class="form-group col-sm-8">
                  <label>{{ $t('drivers.placeholders.color') }}</label>
                  <select class="form-select form-select-sm" id="color" v-model="color">
                    <option v-for="(color, key) in Constants.COLORS" :key="key" :value="color.hex">{{ $t('common.colors.' + color.name) }}</option>
                  </select>
                </div>
                <div class="form-group col-sm-4">
                  <label>{{ $t('drivers.vehicle.color') }}</label>
                  <Field name="color" v-model="driver.vehicle.color.hex" v-slot="{ field, errorMessage, meta }">
                    <input class="form-control form-control-sm p-0" type="color" disabled v-model="field.value" aria-label="Color" aria-describedby="color-addon" v-bind="field" autocomplete="none"/>
                    <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                  </Field>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-sm-6">
                  <label>{{ $t('drivers.vehicle.soat_exp') }}</label>
                  <Field name="soat_exp" type="date" v-model="soatExp" v-slot="{ field, errorMessage, meta }">
                    <input class="form-control form-control-sm" type="date" v-model="field.value" :placeholder="$t('drivers.placeholders.soat_exp')" id="soat_exp" aria-label="Soat_exp" aria-describedby="soat_exp-addon" v-bind="field" autocomplete="none"/>
                    <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                  </Field>
                </div>
                <div class="form-group col-sm-6">
                  <label>{{ $t('drivers.vehicle.tec_exp') }}</label>
                  <Field name="tec_exp" type="date" v-model="tecExp" v-slot="{ field, errorMessage, meta }">
                    <input class="form-control form-control-sm" type="date" v-model="field.value" :placeholder="$t('drivers.placeholders.tec_exp')" id="tec_exp" aria-label="Pec_exp" aria-describedby="tec_exp-addon" v-bind="field" autocomplete="none"/>
                    <span class="is-invalid" v-if="errorMessage || !meta.dirty">{{ errorMessage }}</span>
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="card-footer text-end">
          <button class="btn btn-info" type="submit">{{ $t('common.actions.submit') }}</button>
        </div>
      </div>
    </Form>
    <ImageLoader :id="'image-vehicle'" :resourceId="driver.id" :path="pathVehicle" :event="vehicleEvent"
                 @imageVehicleLoaded="uploadImgVehicle"></ImageLoader>
    <ImageLoader :id="'image-driver'" :resourceId="driver.id" :path="pathDriver" :event="driverEvent"
                 @imageDriverLoaded="uploadImgDriver"></ImageLoader>
  </div>
</template>

<script setup lang="ts">
import StorageService from '@/services/StorageService'
import {ErrorMessage, Field, Form} from 'vee-validate'
import dayjs from 'dayjs'
import Driver from '@/models/Driver'
import DriverRepository from '@/repositories/DriverRepository'
import {Constants} from '@/constants/Constants'
import ToastService from '@/services/ToastService'
import ImageLoader from '@/components/ImageLoader.vue'
import i18n from '@/plugins/i18n'
import {onBeforeMount, ref, Ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useDriversStore} from '@/services/stores/DriversStore'
import router from '@/router'
import DateHelper from '@/helpers/DateHelper'
import {mixed, object, date, string} from 'yup'

const driver: Ref<Driver> = ref(new Driver)
const types: Ref<Array<string>> = ref(Constants.DOC_TYPES)
const driverEvent = 'image-driver-loaded'
const vehicleEvent = 'image-vehicle-loaded'
const pathDriver = StorageService.driverPath
const pathVehicle = StorageService.vehiclePath
const route = useRoute()
const driverStore = useDriversStore()
const soatExp: Ref<string> = ref('')
const tecExp: Ref<string> = ref('')
const color: Ref<string> = ref(Constants.COLORS[0].hex)
const schema = object().shape({
  name: string().required().min(3),
  email: string().required().email(),
  phone: string().required().min(8),
  docType: mixed().oneOf(Constants.DOC_TYPES).required(),
  document: string().required().min(6).max(10),
  brand: string().required().min(3),
  plate: string().required().min(3),
  model: string().required().min(3),
  color: string().matches(new RegExp(/^#([a-fA-F0-9]){3}$|[a-fA-F0-9]{6}$/)).required(),
  soat_exp: date().required().min(new Date),
  tec_exp: date().required().min(new Date)
})

watch(soatExp, (newValue: string) => {
  driver.value.vehicle.soat_exp = DateHelper.dateToUnix(newValue)
})

watch(color, (newColor) => {
  driver.value.vehicle.color = Constants.COLORS.find(c => c.hex == newColor)?? Constants.COLORS[0]
})

watch(tecExp, (newValue: string) => {
  driver.value.vehicle.tec_exp = DateHelper.dateToUnix(newValue)
})

onBeforeMount(() => {
  const id = route.params.id as string
  const driverTmp = driverStore.findById(id)
  if (driverTmp) {
    driver.value = driverTmp
    if (!driver.value.vehicle.color) driver.value.vehicle.color = Constants.COLORS[0]
    soatExp.value = DateHelper.unixToDate(driverTmp.vehicle.soat_exp, 'YYYY-MM-DD')
    tecExp.value = DateHelper.unixToDate(driverTmp.vehicle.tec_exp, 'YYYY-MM-DD')
    color.value = driverTmp.vehicle.color.hex
  }
  else {
    router.push({name: 'drivers'})
  }
})

function uploadImgDriver(url: string): void {
  driver.value.photoUrl = url
  updateDriver()
}

function uploadImgVehicle(url: string): void {
  driver.value.vehicle.photoUrl = url
  updateDriver()
}

function updateDriver(): void {
  DriverRepository.update(driver.value).then(() => {
    ToastService.toast(ToastService.SUCCESS, i18n.global.t('common.messages.updated'))
  }).catch(e => {
    ToastService.toast(ToastService.ERROR, i18n.global.t('common.messages.error'), e.message)
  })
}

function onEnable(event: Event): void {
  const target = event.target as HTMLInputElement
  driver.value.enabled_at = target.checked ? dayjs().unix() : 0
  DriverRepository.enable(driver.value.id?? '', driver.value.enabled_at).then(() => {
    const message = driver.value.enabled_at == 0 ?
        i18n.global.t('users.messages.disabled') : i18n.global.t('users.messages.enabled')
    ToastService.toast(ToastService.SUCCESS, message)
  }).catch(e => {
    ToastService.toast(ToastService.ERROR, i18n.global.t('common.messages.error'), e.message)
  })
}
</script>