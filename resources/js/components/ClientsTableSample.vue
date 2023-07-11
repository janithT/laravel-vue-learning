<template>
  <div>
  
      <router-link slot="right" to="/teams/new" class="button">
        Add Teams
      </router-link>

    <modal-trash-box :is-active="isModalActive" :trash-subject="trashObjectName" @confirm="trashConfirm" @cancel="trashCancel"/>

    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients">

      <template slot-scope="props">
 
        <b-table-column label="ID" field="id" width="60"  sortable searchable>
          {{ props.row.id }}
        </b-table-column>
        <b-table-column label="Name" field="name"  sortable searchable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Email" field="email" sortable searchable>
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="Telephone" field="telephone" width="150" sortable searchable>
          {{ props.row.telephone }}
        </b-table-column>
         <b-table-column  label="Current Route" field="route" sortable searchable>
              {{ props.row.route }}
            </b-table-column>
         
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <router-link :to="{name:'teams.edit', params: {id: props.row.id}}" class="button is-small is-primary">
              <b-icon icon="account-edit" size="is-small"/>
            </router-link>
            <button class="button is-small is-danger"  type="button" @click.prevent="trashModal(props.row)">
              <b-icon icon="trash-can" size="is-small"/>
            </button>
          </div>
        </b-table-column>
      </template>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>

</template>

<script>
import ModalTrashBox from '@/components/ModalTrashBox'


export default {
  name: 'ClientsTableSample',
  components: { ModalTrashBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    },
    
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      arrcount: null
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.dataUrl) {
        this.isLoading = true
        axios
          .get(this.dataUrl)
          .then(r => {
            this.isLoading = false
            if (r.data && r.data.data) {
              if (r.data.data.length > this.perPage) {
                this.paginated = true
                this.arrcount = r.data.data.length
              }
              this.clients = r.data.data
            }
          })
          .catch( err => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    trashModal (trashObject) {
      if(this.$store.state.isAdmin){
        this.trashObject = trashObject
        this.isModalActive = true
      }else{
        return this.$buefy.toast.open({
                  message: `Error: You don't have permission`,
                  type: 'is-danger',
                  queue: false
                })
      }
      
    },
    trashConfirm () {
      this.isModalActive = false
      if(this.trashObject.advanced > 0 || this.trashObject.status == 'complete'){
        return this.$buefy.toast.open({
                  message: `Error: Cannot Delete while payment`,
                  type: 'is-warning',
                  queue: false
                })
      }else{
      axios
        .delete(`/teams/${this.trashObject.id}/destroy`)
        .then( r => {
          this.getData()

          this.$buefy.snackbar.open({
            message: `Deleted ${this.trashObject.name}`,
            queue: false
          })
        })
        .catch( err => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      }
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
