// src/data/recipes.js
export const recipeData = [
    // Main Courses
    {
      id: 'twin-flames-fettuccine',
      title: 'Twin Flames Fettuccine',
      category: 'Main',
      time: '45 min',
      image: '/api/placeholder/400/250',
      pdf: 'cards/twin-flames-fettuccine.pdf',
      description: 'Shrimp Alfredo with Chunky Tomato Vodka Spoon Sauce',
      text: 'A romantic meeting of creamy comfort and spicy brightness, this dish layers a silky emulsified Alfredo beneath a hearty spoon of vibrant, chunky tomato vodka sauce—crowned with paprika-seared shrimp.',
      servings: 4,
      ingredients: [
        // Pasta & Shrimp
        '12 oz fettuccine',
        '1 lb shrimp (peeled, deveined, tails optional)',
        '1 tbsp olive oil',
        '½ tsp smoked paprika',
        '½ tsp garlic powder',
        'Salt, black pepper, lemon zest (to taste)',
        // Chunky Vodka Spoon Sauce
        '2 tbsp olive oil',
        '1 small shallot, minced',
        '4 garlic cloves, minced',
        '¼ tsp red pepper flakes',
        '2 tbsp tomato paste',
        '⅓ cup vodka',
        '1½ cups crushed San Marzano tomatoes (keep it rustic)',
        '1 tsp sugar',
        'Salt & pepper',
        '1 tbsp cold butter (to finish)',
        // Ultra-Smooth Alfredo
        '1½ cups heavy cream',
        '1–2 tsp sodium citrate',
        '¾ cup freshly grated Parmesan',
        '2 tbsp butter',
        'Salt & white pepper to taste',
        'Optional: pinch of nutmeg'
      ],
      instructions: [
        'Cook Pasta: Boil salted water and cook fettuccine to al dente. Reserve ½ cup pasta water. Drain and set aside.',
        'Sear Shrimp: Toss shrimp with paprika, garlic powder, lemon zest, salt. Sear in olive oil (1–2 min per side). Set aside.',
        'Chunky Vodka Sauce: In same skillet, heat oil. Sauté shallot, garlic, and chili flakes for 30 sec. Stir in tomato paste and cook 1–2 min until deepened. Deglaze with vodka and simmer 2–3 min. Add tomatoes, sugar, salt, pepper. Simmer 5–7 min. Swirl in cold butter off heat.',
        'Alfredo Sauce: Heat cream gently. Whisk in sodium citrate. Add Parmesan slowly, whisking until smooth. Stir in butter, season with salt, white pepper, and nutmeg.',
        'Assemble: Toss pasta in Alfredo until glossy. Plate with shrimp and spoon chunky vodka sauce on top. Garnish with basil, parsley, or frizzled shallots.'
      ]
    },

    // Sides
    {
      id: 'prairie-gold-carrot-butter',
      title: 'Prairie Gold Whipped Carrot Butter',
      category: 'Sides',
      time: '45 min',
      image: '/api/placeholder/400/250',
      pdf: 'cards/prairie-gold-carrot-butter.pdf',
      description: 'Rustic Heirloom Carrot Spread',
      text: 'A luxuriously smooth blend of roasted heirloom carrots, cultured butter, and spice—ideal for piping onto warm bread, muffins, or sweet-savory entrées.',
      yield: '~1½ cups',
      ingredients: [
        '¾ lb heirloom carrots (purple, yellow, or orange)',
        '1 tbsp duck fat or olive oil',
        '1 small shallot, halved',
        '1 tsp apple cider vinegar',
        '1 tbsp maple syrup or sorghum (optional)',
        '½ tsp kosher salt',
        '1 stick (½ cup) cultured butter, softened',
        'Pinch of cinnamon + cumin',
        'Optional: pinch of Aleppo pepper for mild warmth',
        '1–2 tbsp cream or buttermilk (to adjust texture)'
      ],
      instructions: [
        'Roast: Preheat oven to 400°F. Peel and cut carrots. Toss with duck fat, salt, syrup (if using), and vinegar. Add halved shallot. Roast 25–30 min until soft and caramelized.',
        'Blend: Cool slightly. Blend carrots, shallot, softened butter, and spices. Add cream or buttermilk 1 tsp at a time for smoothness.',
        'Finish & Serve: Taste for salt and sweetness. Pipe or spoon into ramekins. Optional: fold in toasted nuts or serve chilled with rustic bread.'
      ]
    },

    // Desserts
    {
      id: 'amber-harvest-custard',
      title: 'Amber Harvest Custard',
      category: 'Dessert',
      time: '1 hr',
      image: '/api/placeholder/400/250',
      pdf: 'cards/amber-harvest-custard.pdf',
      text: 'A silky autumn custard featuring roasted butternut squash, maple syrup, and a hint of rosemary—topped with toasted pepitas for crunch.',
      yield: '6 ramekins',
      ingredients: [
        '1 cup butternut squash puree (roasted preferred)',
        '3 egg yolks',
        '1 whole egg',
        '1/4 cup maple syrup',
        '1/4 tsp cinnamon',
        '1 tsp chopped rosemary',
        'Pinch of salt',
        '1 cup cream',
        '1/2 tsp vanilla',
        '2 tbsp pepitas, toasted'
      ],
      instructions: [
        'Preheat oven to 325°F. Blend squash, eggs, syrup, spices, and cream until smooth.',
        'Pour into ramekins. Place in water bath and bake for 35–40 min.',
        'Cool and refrigerate. Serve topped with pepitas and rosemary syrup drizzle.'
      ]
    },

    // Appetizers
    {
      id: 'smoked-trout-apple-tartine',
      title: 'Smoked Trout & Apple Tartine',
      category: 'Appetizers',
      time: '15 min',
      image: '/api/placeholder/400/250',
      pdf: 'cards/smoked-trout-apple-tartine.pdf',
      text: 'Elegant open-faced sandwiches featuring flaked smoked trout, horseradish crème fraîche, and crisp julienned apple on toasted rye.',
      yield: '4 tartines',
      ingredients: [
        '4 slices rye sourdough',
        '4 oz smoked trout, flaked',
        '1/4 cup crème fraîche',
        '1 tsp horseradish',
        '1 green apple, julienned',
        '1 tbsp lemon juice',
        'Chives, edible flowers for garnish'
      ],
      instructions: [
        'Toast rye slices.',
        'Mix crème fraîche with horseradish. Spread on toast.',
        'Top with flaked trout, apple tossed in lemon juice, and chives.',
        'Garnish with flowers. Serve chilled or room temp.'
      ]
    },

    // Main Courses - adding to existing
    {
      id: 'pan-roasted-chicken-sage-grits',
      title: 'Pan-Roasted Chicken Thighs with Sage Brown Butter Grits',
      category: 'Main',
      time: '50 min',
      image: '/api/placeholder/400/250',
      pdf: 'cards/pan-roasted-chicken-sage-grits.pdf',
      text: 'Crispy-skinned chicken thighs glazed with fig-balsamic reduction, served over creamy stoneground grits enriched with nutty sage brown butter.',
      servings: 4,
      ingredients: [
        '4 bone-in chicken thighs',
        'Salt, pepper',
        '1 tbsp oil',
        '1/3 cup fig jam + 1 tbsp balsamic',
        '1 cup stoneground grits',
        '3 cups stock',
        '2 tbsp butter',
        '6–8 sage leaves'
      ],
      instructions: [
        'Sear seasoned chicken in oil skin-side down, then bake at 375°F for 25–30 min.',
        'Simmer fig jam and balsamic for glaze.',
        'Cook grits in stock until creamy. Brown butter with sage, then stir into grits.',
        'Serve chicken over grits, drizzled with fig glaze.'
      ]
    },

    // Desserts - adding to existing
    {
      id: 'earl-grey-silk-pie',
      title: 'Earl Grey Silk Pie',
      category: 'Dessert',
      time: '4 hrs',
      image: '/api/placeholder/400/250',
      pdf: 'cards/earl-grey-silk-pie.pdf',
      text: 'A sophisticated cream pie infused with Earl Grey tea, crowned with white chocolate whipped cream—silky smooth and delicately perfumed.',
      yield: '1 pie',
      ingredients: [
        // Crust
        '1 1/2 cups graham crumbs',
        '1/3 cup butter, melted',
        '1 tbsp sugar',
        // Filling
        '2 cups milk or cream',
        '2 Earl Grey tea bags',
        '3 egg yolks',
        '1/4 cup sugar',
        '2 tbsp cornstarch',
        '1/2 tsp vanilla',
        // Topping
        '1/2 cup white chocolate, melted into 1 cup whipped cream'
      ],
      instructions: [
        'Brew tea in heated milk. Let steep 10 min. Strain.',
        'Whisk yolks, sugar, starch. Slowly add milk and cook until thick.',
        'Pour into crust. Chill 2+ hours.',
        'Top with whipped white chocolate cream.'
      ]
    },

    // Drinks
    {
      id: 'the-widows-garden',
      title: 'The Widow\'s Garden',
      category: 'Drinks',
      time: '10 min',
      image: '/api/placeholder/400/250',
      pdf: 'cards/the-widows-garden.pdf',
      text: 'A sophisticated sparkling cocktail featuring blackberry-rosemary shrub, elderflower cordial, and fresh lemon—garnished with berries and herbs.',
      yield: '2 drinks',
      ingredients: [
        '1/2 cup blackberry–rosemary shrub (or mix 1/2 cup blackberries, 1/4 cup vinegar, 1 tbsp sugar, rosemary sprig)',
        '1 tbsp lemon juice',
        '1 tbsp elderflower cordial',
        'Sparkling water',
        'Ice, rosemary sprigs, and berries to garnish'
      ],
      instructions: [
        'Shake shrub, lemon, and cordial with ice.',
        'Strain into glass with fresh ice.',
        'Top with sparkling water. Garnish with rosemary and berries.'
      ]
    },

    // Bread
    {
      id: 'gristmill-cornbread',
      title: 'Gristmill Cornbread with Lavender-Honey Butter',
      category: 'Bread',
      time: '45 min',
      image: '/api/placeholder/400/250',
      pdf: 'cards/gristmill-cornbread.pdf',
      text: 'Cast-iron skillet cornbread made with stoneground cornmeal, served warm with whipped lavender-honey butter—rustic comfort with a floral touch.',
      yield: '1 skillet',
      ingredients: [
        // Cornbread
        '1 cup stoneground cornmeal',
        '1/2 cup flour',
        '1 tsp baking powder',
        '1/2 tsp salt',
        '1 egg',
        '1 cup buttermilk',
        '2 tbsp honey',
        '2 tbsp butter',
        // Lavender-Honey Butter
        '1/2 cup butter, softened',
        '1 tsp culinary lavender, crushed',
        '1 tbsp honey'
      ],
      instructions: [
        'Mix dry and wet cornbread ingredients separately, then combine.',
        'Pour into greased cast iron and bake at 375°F for 25–30 min.',
        'Whip butter with honey and lavender. Serve warm.'
      ]
    },

    // Appetizers - adding as soup/starter
    {
      id: 'whispers-of-the-prairie-soup',
      title: 'Whispers of the Prairie Soup',
      category: 'Appetizers',
      time: '30 min',
      image: '/api/placeholder/400/250',
      pdf: 'cards/whispers-of-the-prairie-soup.pdf',
      text: 'A delicate umami-rich broth featuring portobello mushrooms, blistered cherry tomatoes, and radish greens—finished with white miso and celery oil.',
      servings: 4,
      ingredients: [
        '1 tbsp oil',
        '1/2 onion, diced',
        '2 portobello caps, sliced',
        '1 cup cherry tomatoes, blistered',
        '1 radish bunch tops, rinsed',
        '1 tbsp white miso',
        '4 cups broth (vegetable or chicken)',
        '1 tsp celery oil (or celery salt + oil)'
      ],
      instructions: [
        'Sauté onion and mushrooms. Add broth, miso, and tomatoes.',
        'Simmer 10 min. Add radish tops last 2 min.',
        'Drizzle with celery oil before serving.'
      ]
    }
  ];
  
  export const categories = [
    'All',
    'Appetizers',
    'Bread',
    'Main',
    'Sides',
    'Dessert',
    'Drinks'
  ];