# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_02_25_070830) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "merchants", force: :cascade do |t|
    t.integer "user_id"
    t.string "agreement_date"
    t.string "and_1"
    t.string "and_2"
    t.string "business_phone"
    t.string "city"
    t.string "city_title_case"
    t.string "contact_name"
    t.string "d_b_a"
    t.string "d_b_a_p"
    t.string "d_b_a_title_case"
    t.string "damages"
    t.string "default_date"
    t.string "email_address"
    t.string "federal_tax_id"
    t.string "first_guarantor"
    t.string "image_date"
    t.string "legal"
    t.string "lender_legal_name"
    t.string "lender_legal_name_title_case"
    t.string "mail_title_case"
    t.string "mailing_address"
    t.string "merchants_legal_name"
    t.string "merchants_legal_name_title_case"
    t.string "mobile"
    t.string "payment_frequency"
    t.string "physical_address"
    t.string "physical_city"
    t.string "physical_state"
    t.string "physical_zip"
    t.string "purchase_price"
    t.string "purchased_amount"
    t.string "purchased_percentage"
    t.string "remittance"
    t.string "second_guarantor"
    t.string "state"
    t.string "state_of_incorporation"
    t.string "type_of_entity"
    t.string "type_of_entity_no_llc"
    t.string "zip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "balance"
    t.string "rtr_legal"
    t.string "total"
    t.string "suit_status"
    t.string "aos"
    t.string "date_served"
    t.string "default_judgment"
    t.string "ucc_status"
    t.string "law_firm"
    t.string "notes"
    t.string "created"
    t.string "second_guarantor_email"
    t.string "second_guarantor_phone"
    t.string "lawyer"
    t.string "lawyer_email"
    t.string "lawyer_phone"
    t.string "litigation_date"
    t.string "response_date"
    t.string "six_month_payoff_date"
    t.string "service"
    t.string "remittance_formatted"
    t.string "balance_pb_amount"
    t.string "rtr_legal_pb_amount"
    t.string "total_pb_amount"
    t.string "contract_payoff_date"
    t.string "first_guarantor_title_case"
    t.string "second_guarantor_title_case"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.string "email"
    t.boolean "boss", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "company_name"
  end

end
