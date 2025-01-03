import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const categories = ["Salary", "Food", "Car", "House", "Other"];

async function seedUsers() {
  for (let i = 0; i < 5; i++) {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: faker.internet.email(),
        password: faker.internet.password(),
        user_metadata: {
          name: faker.name.fullName(),
        },
      });

      if (error) {
        throw new Error(error);
      }

      console.log(`Created user with ID: ${data.user.id}`);
    } catch (error) {
      console.error("Error while seeding users:", error);
    }
  }
}

async function seed() {
  await seedUsers();
  let transactions = [];

  const {
    data: { users },
    error: usersError,
  } = await supabase.auth.admin.listUsers();

  if (usersError) {
    console.error("Error while getting users:", usersError);
    return;
  }

  const userIds = users?.map((user) => user.id);

  for (let i = 0; i < 100; i++) {
    const created_at = faker.date.past();
    const typeBias = Math.random();
    const userId = faker.helpers.arrayElement(userIds);

    let type;
    let category = null;

    if (typeBias < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (typeBias < 0.9) {
      type = "Income";
    } else {
      type = faker.helpers.arrayElement(["Saving", "Investment"]);
    }

    let amount;

    switch (type) {
      case "Expense":
        amount = faker.number.int({ min: 10, max: 1000 });
        break;
      case "Income":
        amount = faker.number.int({ min: 2000, max: 9000 });
        break;
      case "Saving":
        amount = faker.number.int({ min: 3000, max: 10000 });
        break;
      case "Investment":
        amount = faker.number.int({ min: 3000, max: 10000 });
        break;
    }

    transactions.push({
      created_at,
      amount,
      type,
      category,
      description: faker.lorem.sentence(),
      user_id: userId,
    });
  }

  const { error } = await supabase.from("transactions").insert(transactions);

  if (error) {
    console.error("Error while seeding data:", error);
  } else {
    console.log(`Seeded ${transactions.length} transactions`);
  }
}

seed().catch((error) => console.error(error));
