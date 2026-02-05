'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Download, Upload, Save } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  difficultyAr: string;
  image: string;
  ingredients: string[];
  ingredientsAr: string[];
  instructions: string[];
  instructionsAr: string[];
  source: string;
}

const CATEGORIES = [
  { value: 'Soup', ar: 'شوربة' },
  { value: 'Main Course', ar: 'طبق رئيسي' },
  { value: 'Dessert', ar: 'حلويات' },
  { value: 'Salad', ar: 'سلطة' },
  { value: 'Appetizer', ar: 'مقبلات' },
  { value: 'Breakfast', ar: 'فطور' },
  { value: 'Side Dish', ar: 'طبق جانبي' },
  { value: 'Other', ar: 'أخرى' },
];

const DIFFICULTIES = [
  { value: 'Easy', ar: 'سهل' },
  { value: 'Medium', ar: 'متوسط' },
  { value: 'Hard', ar: 'صعب' },
];

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const response = await fetch('/data/recipes.json');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.titleAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.categoryAr?.includes(searchTerm)
  );

  const handleNewRecipe = () => {
    setCurrentRecipe({
      id: '',
      title: '',
      titleAr: '',
      description: '',
      descriptionAr: '',
      category: 'Main Course',
      categoryAr: 'طبق رئيسي',
      prepTime: '',
      cookTime: '',
      servings: 4,
      difficulty: 'Medium',
      difficultyAr: 'متوسط',
      image: '',
      ingredients: [],
      ingredientsAr: [],
      instructions: [],
      instructionsAr: [],
      source: '',
    });
    setIsEditing(true);
  };

  const handleEdit = (recipe: Recipe) => {
    setCurrentRecipe({ ...recipe });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الوصفة؟')) {
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentRecipe) return;

    if (!currentRecipe.id) {
      // Generate ID from Arabic title
      const newId = currentRecipe.titleAr
        ? currentRecipe.titleAr
            .toLowerCase()
            .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        : Date.now().toString();
      
      const newRecipe = { ...currentRecipe, id: newId };
      setRecipes([...recipes, newRecipe]);
    } else {
      setRecipes(
        recipes.map((r) => (r.id === currentRecipe.id ? currentRecipe : r))
      );
    }
    setIsEditing(false);
    setCurrentRecipe(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'recipes.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setRecipes(imported);
        alert('تم استيراد الوصفات بنجاح!');
      } catch (error) {
        alert('خطأ في قراءة الملف');
      }
    };
    reader.readAsText(file);
  };

  const updateArrayField = (field: keyof Recipe, index: number, value: string) => {
    if (!currentRecipe) return;
    const array = [...(currentRecipe[field] as string[])];
    array[index] = value;
    setCurrentRecipe({ ...currentRecipe, [field]: array });
  };

  const addArrayField = (field: keyof Recipe) => {
    if (!currentRecipe) return;
    setCurrentRecipe({
      ...currentRecipe,
      [field]: [...(currentRecipe[field] as string[]), ''],
    });
  };

  const removeArrayField = (field: keyof Recipe, index: number) => {
    if (!currentRecipe) return;
    const array = [...(currentRecipe[field] as string[])];
    array.splice(index, 1);
    setCurrentRecipe({ ...currentRecipe, [field]: array });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🍽️ لوحة التحكم - وصفات شيماء
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {recipes.length} وصفة متاحة
              </p>
            </div>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                <Upload className="w-4 h-4" />
                <span>استيراد</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition"
              >
                <Download className="w-4 h-4" />
                <span>تصدير JSON</span>
              </button>
              <button
                onClick={handleNewRecipe}
                className="flex items-center gap-2 px-4 py-2 bg-majorelle text-white rounded-lg hover:bg-majorelle/90 transition"
              >
                <Plus className="w-4 h-4" />
                <span>وصفة جديدة</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEditing ? (
          /* Edit Form */
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {currentRecipe?.id ? 'تعديل الوصفة' : 'وصفة جديدة'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Arabic Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم بالعربية *
                </label>
                <input
                  type="text"
                  value={currentRecipe?.titleAr || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, titleAr: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="مثال: طاجين مغربي"
                />
              </div>

              {/* French/English Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم بالفرنسية
                </label>
                <input
                  type="text"
                  value={currentRecipe?.title || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Tajine marocain"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التصنيف
                </label>
                <select
                  value={currentRecipe?.category || ''}
                  onChange={(e) => {
                    const cat = CATEGORIES.find((c) => c.value === e.target.value);
                    setCurrentRecipe({
                      ...currentRecipe!,
                      category: e.target.value,
                      categoryAr: cat?.ar || '',
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.ar}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مستوى الصعوبة
                </label>
                <select
                  value={currentRecipe?.difficulty || ''}
                  onChange={(e) => {
                    const diff = DIFFICULTIES.find((d) => d.value === e.target.value);
                    setCurrentRecipe({
                      ...currentRecipe!,
                      difficulty: e.target.value,
                      difficultyAr: diff?.ar || '',
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                >
                  {DIFFICULTIES.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                      {diff.ar}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prep Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وقت التحضير
                </label>
                <input
                  type="text"
                  value={currentRecipe?.prepTime || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, prepTime: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="15 دقيقة"
                />
              </div>

              {/* Cook Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وقت الطهي
                </label>
                <input
                  type="text"
                  value={currentRecipe?.cookTime || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, cookTime: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="30 دقيقة"
                />
              </div>

              {/* Servings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد الأشخاص
                </label>
                <input
                  type="number"
                  value={currentRecipe?.servings || 4}
                  onChange={(e) =>
                    setCurrentRecipe({
                      ...currentRecipe!,
                      servings: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط الصورة
                </label>
                <input
                  type="url"
                  value={currentRecipe?.image || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Ingredients Arabic */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المقادير (بالعربية)
                </label>
                <div className="space-y-2">
                  {currentRecipe?.ingredientsAr?.map((ing, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={ing}
                        onChange={(e) =>
                          updateArrayField('ingredientsAr', index, e.target.value)
                        }
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                        placeholder="مثال: دجاج (500غ)"
                      />
                      <button
                        onClick={() => removeArrayField('ingredientsAr', index)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayField('ingredientsAr')}
                    className="text-sm text-terracotta hover:text-terracotta/80"
                  >
                    + إضافة مكون
                  </button>
                </div>
              </div>

              {/* Instructions Arabic */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  طريقة التحضير (بالعربية)
                </label>
                <div className="space-y-2">
                  {currentRecipe?.instructionsAr?.map((inst, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={inst}
                        onChange={(e) =>
                          updateArrayField('instructionsAr', index, e.target.value)
                        }
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                        rows={2}
                        placeholder={`الخطوة ${index + 1}`}
                      />
                      <button
                        onClick={() => removeArrayField('instructionsAr', index)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayField('instructionsAr')}
                    className="text-sm text-terracotta hover:text-terracotta/80"
                  >
                    + إضافة خطوة
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition"
              >
                <Save className="w-4 h-4" />
                <span>حفظ الوصفة</span>
              </button>
            </div>
          </div>
        ) : (
          /* Recipe List */
          <>
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن وصفة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">إجمالي الوصفات</p>
                <p className="text-2xl font-bold text-gray-900">{recipes.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">بالعربية</p>
                <p className="text-2xl font-bold text-green-600">
                  {recipes.filter((r) => r.titleAr && /[\u0600-\u06FF]/.test(r.titleAr)).length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">بالفرنسية فقط</p>
                <p className="text-2xl font-bold text-amber-600">
                  {recipes.filter((r) => !r.titleAr || !/[\u0600-\u06FF]/.test(r.titleAr)).length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">النتائج المعروضة</p>
                <p className="text-2xl font-bold text-majorelle">{filteredRecipes.length}</p>
              </div>
            </div>

            {/* Recipes Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                      الوصفة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                      التصنيف
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                      الصعوبة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                      اللغة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRecipes.map((recipe) => {
                    const hasArabic = recipe.titleAr && /[\u0600-\u06FF]/.test(recipe.titleAr);
                    return (
                      <tr key={recipe.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={recipe.image || '/images/placeholder.jpg'}
                              alt={recipe.titleAr || recipe.title}
                              className="w-12 h-12 rounded-lg object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                              }}
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {recipe.titleAr || recipe.title}
                              </p>
                              {recipe.titleAr && recipe.title && (
                                <p className="text-sm text-gray-500">{recipe.title}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {recipe.categoryAr || recipe.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              recipe.difficulty === 'Easy'
                                ? 'bg-green-100 text-green-700'
                                : recipe.difficulty === 'Hard'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {recipe.difficultyAr || recipe.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {hasArabic ? (
                            <span className="text-green-600 text-sm">✓ عربي</span>
                          ) : (
                            <span className="text-amber-600 text-sm">⚠ فرنسي</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(recipe)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(recipe.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">لا توجد وصفات مطابقة للبحث</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
