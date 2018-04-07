<template>
  <div class="row justify-content-md-center">
    <div class="col-md-8 col-xs-12">
      <vue-good-wizard
              :steps="steps"
              :onNext="nextClicked"
              :onBack="backClicked"
              finalStepLabel="finished">
        <div slot="page-business">
          <h4>Business Info</h4>
          <div class="row">
            <div class="col-md-12">
              <form>
                <div class="form-group">
                  <label for="tax-id">Tax Id</label>
                  <input type="number" class="form-control" id="tax-id" aria-describedby="emailHelp" placeholder="Tax id"
                      v-model="loan.business.tax_id">
                </div>
                <div class="form-group">
                  <label for="business-name">Business Name</label>
                  <input type="text" class="form-control" id="business-name" placeholder="Business Name"  v-model="loan.business.business_name">
                </div>
                <div class="form-group">
                  <label for="business-name">Business Address</label>
                  <input type="text" class="form-control" id="business-address" placeholder="Business Adress"  v-model="loan.business.business_address">
                </div>
                <div class="form-group">
                  <label for="business-name">City</label>
                  <input type="text" class="form-control" id="city" placeholder="City" v-model="loan.business.city">
                </div>
                <div class="form-group">
                  <label for="business-name">State</label>
                  <input type="text" class="form-control" id="state" placeholder="State" v-model="loan.business.state">
                </div>
                <div class="form-group">
                  <label for="business-name">Postal Code</label>
                  <input type="number" class="form-control" id="postal-code" placeholder="Postal code" v-model="loan.business.postal_code">
                </div>
                <div class="form-group">
                  <label for="requested-amount">Requested Amount</label>
                  <input type="number" class="form-control" id="requested-amount" placeholder="Requested Amount" v-model="loan.amount">
                </div>
                <div class="row" v-if="requiredField !== ''">
                  <div class="col-md-12 alert alert-danger text-center">
                     the field {{requiredField}} is required
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div slot="page-owner">
          <h4>Owner info</h4>
          <div class="row">
            <div class="col-md-12">
              <form>
                <div class="form-group">
                  <label for="social-security">Social Security Number</label>
                  <input type="text" class="form-control" id="social-security" placeholder="Social Security Number"  v-model="loan.owner.social_security">
                </div>
                <div class="form-group">
                  <label for="address">Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Name"  v-model="loan.owner.name">
                </div>
                <div class="form-group">
                  <label for="email">Address</label>
                  <input type="email" class="form-control" id="email" placeholder="Email"  v-model="loan.owner.email">
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" id="address" placeholder="Address"  v-model="loan.owner.address">
                </div>
                <div class="form-group">
                  <label for="business-name">City</label>
                  <input type="text" class="form-control" id="city-o" placeholder="City" v-model="loan.owner.city">
                </div>
                <div class="form-group">
                  <label for="business-name">State</label>
                  <input type="text" class="form-control" id="state-o" placeholder="State" v-model="loan.owner.state">
                </div>
                <div class="form-group">
                  <label for="business-name">Postal Code</label>
                  <input type="number" class="form-control" id="postal-code-o" placeholder="Postal code" v-model="loan.owner.postal_code">
                </div>
                <div class="row"  v-if="requiredField !== ''">
                  <div class="col-md-12 alert alert-danger text-center">
                    the field {{requiredField}} is required
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div slot="page-decision">
          <h4>Decision</h4>
          <div class="row">
            <div class="col-md-12 text-center">
              <h1>{{decision}} !!</h1>
            </div>
          </div>
        </div>
      </vue-good-wizard>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'demo',
        data(){
            return {
                loan: {
                    business: {
                        tax_id: undefined,
                        business_name: "",
                        business_address: "",
                        city: "",
                        state: "",
                        postal_code: undefined
                    },
                    owner: {
                        social_security: '',
                        name: '',
                        email: '',
                        address: '',
                        city: '',
                        state: '',
                        postal_code: '',
                    },
                    amount: 0
                },
                steps: [
                    {
                        label: 'Business Info',
                        slot: 'page-business',
                    },
                    {
                        label: 'Owner info',
                        slot: 'page-owner',
                    },
                    {
                        label: 'Decision',
                        slot: 'page-decision',
                    }
                ],
                decision: "",
                requiredField: "",
            };
        },
        methods: {
            nextClicked(currentPage) {
                this.requiredField = null;
                if(currentPage === 0){
                    const valid = this.validateObject(this.loan.business);
                    if(valid){
                        this.requiredField = ""
                    }
                    return valid;
                }
                if(currentPage === 1){
                    if(!this.validateObject(this.loan.owner)){
                        return false;
                    }
                    axios.post('http://localhost:8888/loan', this.loan)
                        .then(response => {
                            this.decision = response.data.message;
                        })
                        .catch(e => {
                            this.decision = "Ha ocurido un error. Intente nuevamente.";
                        })

                }
                return true;
            },
            backClicked(currentPage) {
                return true;
            },

            validateObject(obj) {
                for (const key in obj) {
                    if (!obj[key] || obj[key] == ""){
                        this.requiredField = key;
                        return false;
                    }
                }
                return true;
            }
        },
    };
</script>